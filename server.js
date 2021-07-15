const express = require("express")
const app = express()

// middleware
app.use(express.json())


// routes
app.use("/sportsLeague", require("./middleware.js"))
app.use("/favColors", require("./practice-middleware.js"))


// port
app.listen(4000, () => {console.log("Port 4000 is running")})

