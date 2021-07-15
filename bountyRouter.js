const express = require("express")
const bountyRouter = express.Router()
const {v4: uuidv4} = require("uuid")

// middlware
bountyRouter.use(express.json())

// fake data
const bountyList = [
    {firstName: "Luke", lastName: "Skywalker", living: "true", bountyAmount: 100000, type: "Jedi", _id: uuidv4()},
    {firstName: "Harry", lastName: "Potter", living: "false", bountyAmount: 300000, type: "Sith", _id: uuidv4()},
    {firstName: "Frankenstein", lastName: "", living: "true", bountyAmount: 250000, type: "Jedi", _id: uuidv4()}
]

// get all
bountyRouter.get("/", (req, res) => {
    res.send(bountyList)
})

// get one
bountyRouter.get("/:bountyId", (req, res) => {
    const bountyId = req.params.bountyId
    const foundBounty = bountyList.find(bounty => bounty._id === bountyId)
    res.send(foundBounty)
        // res.send(`GET req /bounties/${req.params.bountyId} endpoint`)
})

// post
bountyRouter.post("/", (req, res) => {
    const newBounty = req.body
    newBounty._id = uuidv4()
    bountyList.push(newBounty)
    res.send(newBounty)
})

// put
bountyRouter.put("/:bountyId", (req, res) => {
    const bountyId = req.params.bountyId
    const updatedBounty = req.body
    const bountyIndex = bountyList.findIndex(bounty => bounty._id === bountyId)
    const updated = Object.assign(bountyList[bountyIndex], updatedBounty)
    res.send(updated)
})

// delete
bountyRouter.delete("/:bountyId", (req, res) => {
    const bountyId = req.params.bountyId
    const bountyIndex = bountyList.findIndex(bounty => bounty._id === bountyId)
    const deleteBounty = bountyList.splice(bountyIndex, 1)
    res.send(deleteBounty)
})

module.exports = bountyRouter