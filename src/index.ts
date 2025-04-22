import express, { Request, Response } from "express"

const app = express()

app.get('/', (req, res) => {
    res.send(`<h1>Hello express js</h1>`)
})

// enpoing for products 
app.get("/products", (req, res) => {
    res.send([
        {id: 1, name: "Blue T-Shirt"},
        {id: 2, name: "Blue T-bant"},
    ])
})
app.get("/products/1", (req: Request, res: Response ) => {
    res.send( {id: 1, name: "Blue T-Shirt"})
})
const PORT : number = 5000
app.listen(PORT , () => {
    console.log(`Server running at => http://localhost:${PORT}`)
})