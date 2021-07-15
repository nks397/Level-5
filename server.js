const express = require("express")
const app = express()

// routes
app.use("/bounties", require("./bountyRouter.js"))

// port
app.listen(7000, ()=> console.log("Port 7000 is running"))