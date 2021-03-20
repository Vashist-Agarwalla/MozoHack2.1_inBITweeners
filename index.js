const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/mozoHack', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!")
        console.log(err)
    })

let activeuser = null;

app.get('/', (req, res) => {
    res.send("TRY")
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    res.send("TRY")
})

app.get('/signup', (req, res) => {
    res.send("signup")
})

app.post('/signup', (req, res) => {
    res.send("TRY")
})

app.get('/logout', (req, res) => {
    res.send("logout")
})

app.listen(3030, () => {
    console.log("YOU ARE AR PORT 3030!!!")
})