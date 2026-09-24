const express = require("express")

const app = express()

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const path = require('path')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')))

const database = {
    model:"Ford",
    year: 2027,
    color: "Green"
}

const methodOverride = require("method-override")
app.use(methodOverride("_method"))

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

let shopping_list = [
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
    res.render('shopping', {shopping_list})
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

app.get("/shoppinglist/:id/edit",(req,res)=>{
    const listId = req.params.id;
    res.render('editForm', {listId})
})

next_id = shopping_list.length+1

app.post("/shoppinglist",(req,res)=>{
    data = req.body
    //console.log(data)

    const obj = {
        id:next_id,
        name: data.name,
        quantity: data.quantity
    }
    shopping_list.push(obj)
    next_id++
    res.redirect("/shoppinglist")
})

app.delete("/shoppinglist/:id",(req,res)=>{
    const listId = req.params.id;
    shopping_list = shopping_list.filter(item => item.id != listId)
    res.redirect("/shoppinglist")
})

//UPDATE
app.patch("/shoppinglist/:id",(req,res)=>{
    const listId = req.params.id;
    data = req.body;
    const updatedItem = shopping_list.find(item => item.id == listId)
    if(updatedItem == undefined){
        return res.send("Nie znaleziono")
    }
    updatedItem.name = data.name
    updatedItem.quantity = parseInt(data.quantity)
    res.redirect("/shoppinglist")
})

shopping_list.forEach(item =>{
    console.log(item);
})

app.listen(PORT,()=>{
    console.log(`Server Listening on port ${PORT}`)
})