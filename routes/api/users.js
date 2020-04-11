const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")

// @route            GET api/users/test
// @description      Tests Users Route
// @access           PUBLIC

router.get("/test", (req, res) => {
  res.json({ message: "Users Works" })
})

// @route            GET api/users/register
// @description      Register a User
// @access           PUBLIC

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" })
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err))
        })
      })
    }
  })
})

// @route            GET api/users/login
// @description      Login User / Returning JWT Token
// @access           PUBLIC

router.post("/login", (req, res) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email }).then((user) => {
    // check for user
    if (!user) {
      return res.status(404).json({ email: "User not found" })
    }
    // check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // user matched
        const payload = { id: user.id, name: user.name } //Create JWT Payload
        jwt.sign(payload)
      } else {
        return res.status(400).json({ password: "Password incorrect" })
      }
    })
  })
})
module.exports = router
