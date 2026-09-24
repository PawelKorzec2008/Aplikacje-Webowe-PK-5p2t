const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const { time } = require('console');

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'dupa14',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60}
}))

const PORT = 3000

app.get('/',(req,res)=>{
    res.send("użyj /zad1, /zad2, lub /zad3 żeby przejść do odpowiednich zadań")
})

app.get('/zad1',(req,res)=>{
    const theme = req.cookies.theme
    //sprawdź ciasteczko
    res.render('zad1', {theme:theme})
})

app.post('/zad1',(req,res)=>{
    const theme = req.body.theme;
    res.cookie('theme', theme,{
        maxAge: 1000 * 60 * 60, //1h
        httpOnly: true
    });
    res.redirect('/zad1')
})

app.get('/zad2',(req,res)=>{
    //console.log(req.session.views)
    if(req.session.views==undefined){
        //console.log("Wszedł")
        req.session.views = 1;
        res.render('zad2', {views:parseInt(req.session.views)})
    }else{
        req.session.views += 1
        res.render('zad2', {views:parseInt(req.session.views)})
    }
})

app.get('/zad3',(req,res)=>{
    const time = req.cookies.lastModified
    console.log(req.cookies.lastModified)
    //console.log(req.session.cart)
    res.render('zad3', {cart:req.session.cart, time:time})
})

app.post('/zad3/cart/add/:productName',(req,res)=>{
    if(req.session.cart){
        req.session.cart.push(req.params.productName)
    }else{
        req.session.cart = [];
        req.session.cart.push(req.params.productName)
    }
    let data = new Date()
    data = data.toString()
    console.log(data)
    res.cookie('lastModified', data ,{
        maxAge: 1000 * 60 * 60, //1h
        httpOnly: true
    });
    res.redirect('/zad3')
})

app.listen(PORT,()=>{
    console.log(`Server Listening on port ${PORT}`)
})