const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');

const PORT = 3000

app.get('/',(req,res)=>{
    res.send("użyj /zad1, /zad2, lub /zad3 żeby przejść do odpowiednich zadań")
})

app.get('/zad1',(req,res)=>{
    let theme = "light"
    //sprawdź ciasteczko
    res.render('zad1', {theme})
})

app.listen(PORT,()=>{
    console.log(`Server Listening on port ${PORT}`)
})