const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const UserData = require('./models/user')
const PlantData = require('./models/plant')

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

let plantData;

app.get('/', async(req, res) => {
    res.render('home', { activeUser })
})

app.get('/grow', async(req, res) => {
    res.render('grow', { activeUser })
})

app.get('/about', async(req, res) => {
    res.render('about', { activeUser })
})

app.get('/search', async(req, res) => {
    if (activeUser === null) {
        res.redirect('/login')
    }
    res.render('search', { activeUser, plantData })
})

app.post('/search', async(req, res) => {
    const filter = req.body;
    console.log(filter)
    const plantData = await PlantData.find(filter)
    res.render('search', { activeUser, plantData })
})

app.get('/login', (req, res) => {
    res.render('login', { activeUser })
})

app.post('/login', async(req, res) => {
    const active = new UserData(req.body)
    activeUser = await UserData.findOne({ username: active.username })
    plantData = await PlantData.find({})
    res.redirect('/search')
})

app.get('/signup', (req, res) => {
    res.render('signup', { activeUser })
})

app.post('/signup', async(req, res) => {
    const newUser = new UserData(req.body);
    await newUser.save()
    console.log(newUser)
    res.redirect('/login')
})

app.get('/logout', (req, res) => {
    activeUser = null
    res.redirect('/')
})

app.listen(3030, () => {
    console.log("YOU ARE AR PORT 3030!!!")
})