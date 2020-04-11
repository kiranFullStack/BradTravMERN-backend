const express = require("express")
const mongoose = require("mongoose")
const users = require("./routes/api/users")
const profile = require("./routes/api/profile")
const port = process.env.PORT || 5000

const app = express()
//
// ─── O ──────────────────────────────────────────────────────────────────────────
//

mongoose
  .connect("mongodb://localhost:27017/trialdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected🥁🥁🥁🥁🥁🥁🥁🥁"))
  .catch((err) => console.log(err))
//
// ─── O ──────────────────────────────────────────────────────────────────────────
//

app.get("/", (req, res) => {
  res.send("Hey from express!!")
})
app.use("/api/users", users)
app.use("/api/profile", profile)

//
// ─── O ──────────────────────────────────────────────────────────────────────────
//

app.listen(port, () => console.log(`Listening on ${port}`))
