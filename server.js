const express = require("express")
const app = express()
const {v4: uuidv4} = require("uuid")

// fake data
const inventoryItems = [
    {
        name: "banana",
        type: "food",
        price: 200,
        _id: uuidv4()
    },{
        name: "pants",
        type: "clothing",
        price: 2500,
        _id: uuidv4()
    },{
        name: "basketball",
        type: "toy",
        price: 1000,
        _id: uuidv4()
    },{
        name: "rockem sockem robots",
        type: "toy",
        price: 1500,
         _id: uuidv4()
    },{
        name: "shirt",
        type: "clothing",
        price: 800,
        _id: uuidv4()
    },{
        name: "soup",
        type: "food",
        price: 300,
        _id: uuidv4()
    },{
        name: "flour",
        type: "food",
        price: 100,
        _id: uuidv4()
    }
]

// middleware
app.use(express.json())

// routes

// get all
app.get("/inventory", (req, res) => {
    res.send(inventoryItems)
})

// get one
app.get("/inventory/:id", (req, res) => {
    const id = req.params.id
    const foundItem = inventoryItems.find(item => item._id === id)
    res.send(foundItem)
})

// get by type

// localhost:5000/inventory/search/type?type=clothing

app.get("/search/type", (req, res) => {
    const type = req.query.type
    const filteredType = inventoryItems.filter(item => item.type === type)
    res.send(filteredType)
    console.log(filteredType)
})

// Extra Credit:
// Write another route where an API user can filter by a maxium price AND a minium price. You can make the maxium default to 1000000 and the minimum defualt to 0

// get by price
//filter by a max and min price

// port
app.listen(5000, ()=>{console.log("Port 5000 is running")})
