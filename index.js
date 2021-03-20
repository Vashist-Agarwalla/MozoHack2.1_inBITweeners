const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const UserData = require('./models/user')

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

let activeUser = null;

app.get('/', (req, res) => {
    res.send("Home")
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const active = new UserData(req.body)
    activeUser = await UserData.findOne({ username: active.username, password: active.password })
        .then(
            console.log(activeUser)
        )
        .catch(
            console.log('wrong password')
        )
    res.send("TRY")
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', async (req, res) => {
    const newUser = new UserData(req.body);
    await newUser.save()
    res.redirect('/login')
})

app.get('/logout', (req, res) => {
    res.send("logout")
})

app.listen(3030, () => {
    console.log("YOU ARE AR PORT 3030!!!")
})