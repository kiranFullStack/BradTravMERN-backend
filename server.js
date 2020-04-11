const express = require("express")
const mongoose = require("mongoose")
const app = express()

mongoose
  .connect("mongodb://localhost:27017/trialdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected🥁🥁🥁🥁🥁🥁🥁🥁"))
  .catch((err) => console.log(err))

const port = process.env.PORT || 5000
app.get("/", (req, res) => {
  res.send("Hey from express!!")
})
app.listen(port, () => console.log(`Listening on ${port}`))
