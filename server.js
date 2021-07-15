const express = require("express")
const app = express()

// app.use(express.json())

// routes
app.use("/bounties", require("./routes/bountyRouter.js"))

// port
app.listen(7000, ()=> {console.log("Port 7000 is running")})