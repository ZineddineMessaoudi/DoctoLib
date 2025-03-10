const bcrypt = require("bcrypt")
const config = require("../config/jwt-config")
const { User } = require("../models")
const jwtUtils = require("../utils/jwt.utils")
const express = require("express")
const router = express.Router()

const register = async (req, res) => {
  try {
    const { email, password, roleId } = req.body
    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS)
    const newUser = await User.create({
      email,
      password: hashedPassword,
      roleId,
    })

    const { password: _, ...userWithoutPassword } = newUser
    res
      .status(201)
      .json({ message: "User created successfully", user: userWithoutPassword })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwtUtils.generateToken(user)
    res.status(200).json({ message: "Login successful", token })
  } catch (error) {
    next(error)
  }
}

router.post("/register", register)
router.post("/login", login)

module.exports = router
