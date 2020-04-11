const express = require("express")
const router = express.Router()

// @route            GET api/profile/test
// @description      Tests Profile Route
// @access           PUBLIC

router.get("/test", (req, res) => {
  res.json({ message: "Profile Works" })
})

module.exports = router
