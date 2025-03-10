const jwt = require("jsonwebtoken")
const { JWT_SECRET, ACCESS_TOKEN_EXPIRY } = require("../config/jwt-config")

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  })
}

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET)
}

module.exports = { generateToken, verifyToken }
