const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")
const passport = require("passport")

// Load Input Validation
const validateRegisterInput = require("../../validation/register")
const validateLoginInput = require("../../validation/login")
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
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

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
  const { errors, isValid } = validateLoginInput(req.body)
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

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
        // User matched
        const payload = { id: user.id, name: user.name } //Create JWT Payload
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3500 },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token })
          }
        )
      } else {
        return res.status(400).json({ password: "Password incorrect" })
      }
    })
  })
})

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      asana: req.user.asana,
      pranayama: req.user.pranayama,
      meditation: req.user.meditation,
    })
  }
)

//
// ─── TESTING ────────────────────────────────────────────────────────────────────
//

router.get(
  "/testing",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(`Wohoooo ${req.user.name}`)
  }
)
module.exports = router
