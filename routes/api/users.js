const express = require("express")
const router = express.Router()

//
// ─── O ──────────────────────────────────────────────────────────────────────────
//

router.get("/test", (req, res) => {
  res.json({ message: "Users Works" })
})

module.exports = router
