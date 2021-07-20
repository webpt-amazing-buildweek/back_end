const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../auth/secrets/secrets");

module.exports = async (req, res, next) => {
  //next(); //don't forget to remove next() first next time!!!!
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
  //  TEST QUESTIONS 16, 17, 19
  try {
    const token = req.headers.authorization;

    //This implements 2
    if (!token) {
      res.status(401).json({ message: "token required" });
    }
    //This implements 3
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "token invalid" });
      } else {
        //This implements 1
        req.token = decoded; // store the decoded token in the request object
        next();
      }
    });
  } catch (err) {
    next();
  }
};
