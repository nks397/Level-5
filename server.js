const express = require("express")
const app = express()

// routes
app.use("/todo", require("./todoListRouter.js"))

// port
app.listen(6000, () => {console.log("Port 6000 is running")})
