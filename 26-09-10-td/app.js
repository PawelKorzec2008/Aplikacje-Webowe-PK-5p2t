const express = require("express")

const app = express()

const PORT = 3000

const database = {
    model:"Ford",
    year: 2027,
    color: "Green"
}

const list = ['Banana','Apple','Orange']

app.get("/",(req,res)=>{
    res.send(database)
})

app.get("/shopping",(req,res)=>{
    res.send(list)
})

app.get("/shopping/:imie",(req,res)=>{
    res.send(`Wygenerowano listę dla ${req.params.imie}`)
})

app.get("/car",(req,res)=>{
    res.send(`Oto lista pojazdów dla koloru ${req.query.color}`)
})

var numbers = [14,67,9]

app.get("/numbers",(req,res)=>{
    var qnumbers = numbers.slice()
    switch(req.query.sort){
        case "asc":
            res.send(qnumbers.sort((a,b)=>a-b))
            break;
        case "desc":
            res.send(qnumbers.sort((a,b)=>b-a))
            break;
        default:
            res.send(qnumbers)
            break;
    }
})

shopping_list = [
    {
        id: 1,
        name: "Apple",
        quantity: 6
    },
    {
        id: 2,
        name: "Banana",
        quantity: 3
    },
]

app.get("/shoppinglist",(req,res)=>{
    res.send(shopping_list)
})

app.get("/shoppinglist/:id",(req,res)=>{
    const listId = req.params.id;
    for(let i = 0;i<shopping_list.length;i++){
        if(shopping_list[i].id == listId){
            return res.send(shopping_list[i])
        }
    }
    res.send({})
})

app.post("/shoppinglist",(req,res)=>{
    const obj = {
        id:3,
        name: "Orange",
        quantity: 4
    }
    shopping_list.push(obj)

    res.redirect("/shopping")
})

app.listen(PORT,()=>{
    console.log(`Server Listening on port ${PORT}`)
})