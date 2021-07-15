const express = require("express")
const app = express()
const {v4: uuidv4} = require("uuid")

// fake data
let bountyList = [
    {firstName: "Darth", lastName: "Vader", living: "True", bountyAmount: 100000, type: "Sith", _id: uuidv4()},
    {firstName: "Mace", lastName: "Windu", living: "True", bountyAmount: 50000, type: "Jedi", _id: uuidv4()},
    {firstName: "Darth", lastName: "Tyranus", living: "False", bountyAmount: 10000, type: "Sith", _id: uuidv4()}
]

// let bountyList = []

// middleware
app.use(express.json())

// routes

// get all
app.get("/bounty", (req, res) => {
    res.send(bountyList)
})

// get one
app.get("/bounty/:bountyId", (req, res) => {
    const bountyId = req.params.bountyId
    const foundBounty = bountyList.find(bounty => bounty._id === bountyId)
    res.send(foundBounty)
})

app.post("/bounty", (req, res) => {
    const newBounty = req.body
    newBounty._id = uuidv4()
    bountyList.push(newBounty)
    res.send(newBounty)

})

app.put("/bounty/:bountyId", (req, res) => {
    const bountyId = req.params.bountyId
    const updatedBounty = req.body
    const bountyIndex = bountyList.findIndex(bounty => bounty._id == bountyId)
    const updated = Object.assign(bountyList[bountyIndex], updatedBounty)
    res.send(updated)
    
})

app.delete("/bounty/:bountyId", (req, res) => {
    const bountyId = req.params.bountyId
    const bountyIndex = bountyList.findIndex(bounty => bounty._id === bountyId)
    const newBountyList = bountyList.splice(bountyIndex, 1)
    res.send(newBountyList)
    
})

// port
app.listen(8000, ()=> {
    console.log("Port 8000 is running")
})