const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../../secrets")
const bcrypt = require("bcryptjs")
const users = require('./users-model')
const { 
  checkEmailUnique,
  checkUsernameFree,
  checkUsernameExists, 
} = require('./users-middleware')


router.post("/register", checkEmailUnique, checkUsernameFree, async (req, res, next) => {
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

router.post("/login", checkUsernameExists, async (req, res, next) => {
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

module.exports = router