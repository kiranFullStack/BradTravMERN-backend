const express = require("express")
const router = express.Router()

// @route            GET api/users/test
// @description      Tests Users Route
// @access           PUBLIC

router.get("/test", (req, res) => {
  res.json({ message: "Users Works" })
})

module.exports = router
