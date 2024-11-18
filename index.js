import express from 'express';
import cors from "cors";
const app = express()
const port = 3000;
// MiddleWares 
app.use(express.json());
app.use(cors());

const generateRandomId = () => {
    const id = []
    for (let i = 0; i < 20; i++) {
        const randomNumber = Math.floor(Math.random() * 10);
        id.push(randomNumber);
    }
    return id.join("");
}
const todos = [];

// Get All Todos 
app.get('/todos', (req, res) => {
    res.status(400).json(todos);
})

// Post Todo 
app.post("/todos", ((req, res) => {
    const { title } = req.body;
    console.log(title);

    if (!title) {
        res.status(400).json({
            message: "Title is required",
        })
        return;
    }
    todos.push({
        id: generateRandomId(),
        title,
    })

    res.status(201).json({
        message: "Todo Added successfully",
    })

}))

// Get Single User 
app.get("/todos/:id", ((req, res) => {
    const { id } = req.params;
    console.log(id);
    for (let todo of todos) {
        if (todo.id === id) {
            res.status(200).json({
                message: "Todo Found",
                todo: todo,
            })
            return;
        }
    }

    res.status(400).json({
        message: "Todo Not Found",
        id: id
    })
}))


// Update Todo
app.put("/todos/:id", (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    if (!title) {
        res.status(400).json({
            message: "Title is required",
        })
        return;
    }
    for (let todo of todos) {
        if (todo.id === id) {
            todo.title = title;
            res.status(200).json({
                message: "Todo Updated Successfully",
                todo,
            })
            return;
        }
    }
})


// Delete Todo 
app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    for (let todo of todos) {
        if (todo.id === id) {
            todos.splice(todos.indexOf(todo), 1);
            res.status(200).json({
                message: "Todo Deleted Successfully",
            })
            return;
        }
    }
    res.status(400).json({
        message: "Todo Not Found",
        id: id
    })
})

app.listen(port, () => {
    console.log(`App has listened client on port ${port}`)
})

