const express = require("express")
const todoListRouter = express.Router()
const {v4: uuidv4} = require("uuid")

const todoList = [
    {name: "Grocery Shop", description: "Buy eggs and milk.", imageUrl: "", completed: false, _id: uuidv4()},
    {name: "Emails", description: "Check emails.", imageUrl: "", completed: "false", _id: uuidv4()},
    {name: "Post Office", description: "Drop off package.", imageUrl: "", completed: "true", _id: uuidv4()}
]

// todoListRouter.use("/", (req, res, next) => {
//     res.send(todoList)
//     next()
// })

todoListRouter.use(express.json())

// get all
todoListRouter.get("/", (req, res) => {
    res.send(todoList)
})

// get one
todoListRouter.get("/:todoId", (req, res) => {
    const todoId = req.params.todoId
    const foundTodo = todoList.find(item => item._id === todoId)
    res.send(foundTodo)

})


// post
todoListRouter.post("/", (req, res) => {
    const newTodo = req.body
    newTodo._id = uuidv4()
    todoList.push(newTodo)
    res.send(newBounty)
})

// put
todoListRouter.put("/:todoId", (req, res) => {
    const todoId = req.params.todoId
    const updatedTodo = req.body
    const todoIndex = todoList.findIndex(item => item._id === todoId)
    const update = Object.assign(todoList[todoIndex], updatedTodo)
    res.send(update)
})

// delete
todoListRouter.delete("/:todoId", (req, res) => {
    const todoId = req.params.todoId
    const todoIndex = todoList.findIndex(item => item._id === todoId)
    const newTodoList = todoList.splice(todoIndex, 1)
    res.send(newTodoList)
})

module.exports = todoListRouter