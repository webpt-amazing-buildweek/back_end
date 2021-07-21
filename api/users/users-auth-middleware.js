const { JWT_SECRET } = require("../../secrets")
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({
        message: "Token required",
      })
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Token invalid",
        })
      }
  
      req.token = decoded

      next()
  })
 } catch(err) {
   next(err)
 }
}

