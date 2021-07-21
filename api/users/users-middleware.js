const users = require("./users-model")

const checkEmailUnique = async (req, res, next) => {
  try {
    
    const { user_email } = req.body
    const user = await users.findBy({ user_email })
    
    if (user.length > 0) {
      return res.status(422).json({
        message:"Email already in use"
      })
    }
    next()
  } catch(err) {
    next(err)
  }
}

const checkUsernameFree = async (req, res, next) => {
    try {
      
      const { user_username } = req.body
      const user = await users.findBy({ user_username })
      
      if (user.length > 0) {
        return res.status(422).json({
          message:"Username taken"
        })
      }
      next()
    } catch(err) {
      next(err)
    }
  }
  

const checkUsernameExists = async (req, res, next) => {
 try {
  const { user_username } = req.body
  const user = await users.findBy({ user_username })
  
    if (user.length < 1) {
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }
    next()
 } catch(err) {
    next(err)
 }
}


module.exports = {
  checkEmailUnique,
  checkUsernameFree,
  checkUsernameExists,
}