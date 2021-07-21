/* eslint-disable no-mixed-spaces-and-tabs */
const express = require('express')
const helmet = require('helmet')
//const authenticate = require('./users/users-auth-middleware')
//const usersRouter = require('./users/users-router')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../secrets/index")
const bcrypt = require("bcryptjs")
const users = require('./users/users-model')
const { 
  checkEmailUnique,
  checkUsernameFree,
  checkUsernameExists, 
} = require('./users/users-middleware')
const cors = require('cors')

// const cookieParser = require('cookie-parser')

const server = express()
server.use(express.json())
server.use(helmet())

server.use(cors({ 
	origin: '*',
	methods: ['GET', 'PUT', 'POST', 'DELETE']
}))

server.options('*', cors())


// server.use(cookieParser())
server.get('/', (req, res) => {
    res.json({message: 'African Spice Market is all 200s and blue skies'})
})

//server.use('/api/users', usersRouter)

server.use((err, req, res, next) => { //eslint-disable-line
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})


server.post("/api/users/register", checkEmailUnique, checkUsernameFree, async (req, res, next) => {
	try {
	  const { user_username, user_email, user_password } = req.body
  
	  const hashedPW = await bcrypt.hash(user_password, 10)
	  
	  const newUser = await users.add({
		user_username,
		user_email,
		user_password: hashedPW,
	  })
	  
	  res.status(201).json({
		user_id: newUser.user_id,
		user_username: newUser.user_username,
		user_email: newUser.user_email
	  })
  
	} catch (err) {
	  next(err)
	}
  })
  
  server.post("/api/users/login", checkUsernameExists, async (req, res, next) => {
	try {
	  const { user_username, user_password } = req.body
  
	  const user = await users.findBy({ user_username })
  
	  const passwordValid = await bcrypt.compare(user_password, user[0].user_password)
  
	  if (!passwordValid) {
			  return res.status(401).json({
				  message: "Invalid Credentials",
			  })
		  }
  
	  const token = jwt.sign({
		user_id: user[0].user_id,
		user_username: user[0].user_username
	  }, JWT_SECRET)
  
	  // res.cookie("token", token)
  
	  
	  res.status(200).json({
	  message: `${user[0].user_username} is back!`,
	  token: token,
	  user_id: user[0].user_id,
	  user_username: user[0].user_username
	})
	} catch (err) {
	  next(err)
	}
  
  })
module.exports = server
