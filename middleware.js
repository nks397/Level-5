const express = require("express")
const sportsLeagueRouter = express.Router()
const {v4: uuidv4} = require("uuid")

const sportsLeague = [
    {name: "NBA", amountOfTeams: "30", startingYear: "1946", _id: uuidv4()},
    {name: "NFL", amountOfTeams: "32", startingYear: "1920", _id: uuidv4()},
    {name: "MLB", amountOfTeams: "30", startingYear: "1876", _id: uuidv4()}
]

sportsLeagueRouter.use("/", (req, res, next) => {
    req.body = sportsLeague
    next()
})

// routes
sportsLeagueRouter.get("/", (req, res) => {
    res.send(sportsLeague)
})


module.exports = sportsLeagueRouter
// Pull that module into your main server code and set it up as middleware.
