const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const users = require("./routes/api/users")
const profile = require("./routes/api/profile")
const port = process.env.PORT || 5000

const app = express()
//
// ─── Mongoose connecting with MongoDB ──────────────────────────────────────────────────────────────────────────
//

mongoose
  .connect("mongodb://localhost:27017/trialdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected🥁🥁🥁🥁🥁🥁🥁🥁"))
  .catch((err) => console.log(err))

//
// ─── Body parser middleware ──────────────────────────────────────────────────────────────────────────
//

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//
// ─── Routes ──────────────────────────────────────────────────────────────────────────
//

app.get("/", (req, res) => {
  res.send("Hey from express!!")
})
app.use("/api/users", users)
app.use("/api/profile", profile)

//
// ─── Port Listening ──────────────────────────────────────────────────────────────────────────
//

app.listen(port, () => console.log(`Listening on ${port}`))
