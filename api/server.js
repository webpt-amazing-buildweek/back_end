const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const Users = require("./auth/users/users-model");

//token handling imports
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./auth/secrets/secrets");

// restricted access middleware
const restrict = require('./middleware/restricted');

//bring in the routers
const usersRouter = require('./auth/users/users-router')



const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());
//server.use('./api/auth', usersRouter)


//add server default sanity check
server.get("/", (req, res) => {
    res.status(200).json({ apiStatus: "All 200's and Blue Skies" })
  })
 

server.post("/api/auth/register", async (req, res, next) => {  //eslint-disable-line

  try {
    const { username, password, email } = req.body;
    // const username = 'tony'
    // const password = 'password'
    // const email = 'tony@mail.com'
    // console.log('req.body value',req.body)
    //if username and password are not provided, return error
    if (!username || !password || !email) {
      return res.status(404).json({
        message: "username, email, and password required",
      });
    }
    //if username is taken, return error
    const userNameIsFound = await Users.findByUsername(username);
    if (userNameIsFound) {
      return res.status(409).json({
        message: "username taken",
      });
    }
    //if email is taken, return error
    const emailIsFound = await Users.findByEmail(email)
    if (emailIsFound) {
        return res.status(409).json({
            message: "email taken",
          });
    }

    //if username and email is not taken, hash the password and save it to the database
    const newUser = await Users.create({
      username,
      password: await bcrypt.hash(password, 3),
      email
    });
    //return the new user's details
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

server.post("/api/auth/login", async (req, res, next) => { //eslint-disable-line
 
  try {
    //const { username, password } = req.body;
    const username = 'sylvie'
    const password = 'password'
    //if username and password are not provided, return error
    if (!username || !password) {
      return res.status(404).json({
        message: "username and password required",
      });
    }

    const user = await Users.findByUsername(username);
    // if user name doesn't exist
    if (!user) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }

    //check if password is correct
    const passwordValid = await bcrypt.compare(password, user.password);
    //if not then return error
    if (!passwordValid) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }
    //if password is correct then create token
    const token = jwt.sign(
      {
        username: user.username,
      },
      JWT_SECRET
    );
    //return success message and token
    res.status(200).json({
      message: `welcome, ${user.username}`,
      token: token,
    });
  } catch (err) {
    next(err);
  }
});
module.exports = server;
