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
let selectedPlant;

function formatDate(date) {
    var d = new Date(date),
        m = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        y = d.getFullYear();

    if (m.length < 2)
        m = '0' + m;
    if (day.length < 2)
        day = '0' + day;

    return [y, m, day];
}

app.get('/', async(req, res) => {
    res.render('home', { activeUser })
})

app.get('/about', async(req, res) => {
    res.render('about', { activeUser })
})

app.get('/grow', async(req, res) => {
    let Tdate = Date()
    let cD = formatDate(Tdate)
    let pD = activeUser.pdate;
    let flag = 0;
    let B = activeUser.balance;
    while (flag === 0) {
        if (cD[0] == pD[0]) {
            if (cD[1] == pD[1]) {
                B = B - (cD[2] - pD[2])
                flag = 1;
                break;
            } else if (pD[1] % 2 == 0) {
                B = B - [30 - pD[2]] - 1;
                pD[1] = pD[1] + 1;
                pD[2] = 1;
                continue;
            } else {
                B = B - [38 - pD[2]] - 1;
                pD[1] = pD[1] + 1;
                pD[2] = 1;
            }
        }
    }

    res.render('grow', { activeUser, B })
})


app.get('/newgrow', async(req, res) => {
    let Tdate = Date()
    activeUser.pdate = formatDate(Tdate)
    let bal = selectedPlant.growthTime
    await UserData.findOneAndUpdate({ username: activeUser.username }, { pdate: activeUser.pdate, balance: bal }, { new: true })
        // console.log(activeUser.pdate)
    res.redirect('/grow')
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

app.post('/search/:id', async(req, res) => {
    const { id } = req.params
    selectedPlant = await PlantData.findOne({ _id: id })
        // console.log(selectedPlant)
    res.redirect('/info')
})

app.get('/info', async(req, res) => {
    res.render('info', { activeUser, selectedPlant })
})

app.get('/login', (req, res) => {
    res.render('login', { activeUser })
})

app.post('/login', async(req, res) => {
    const active = new UserData(req.body)
    activeUser = await UserData.findOne({ username: active.username })
    plantData = await PlantData.find({})
    if (activeUser.balance) {
        res.redirect('/grow')
    }
    res.redirect('/search')
})

app.get('/signup', (req, res) => {
    res.render('signup', { activeUser })
})

app.post('/signup', async(req, res) => {
    const newUser = new UserData(req.body);
    await newUser.save()
    res.redirect('/login')
})

app.get('/logout', (req, res) => {
    activeUser = null
    res.redirect('/')
})

app.get('*', (req, res) => {
    res.redirect('/')
})

app.listen(3030, () => {
    console.log("YOU ARE AR PORT 3030!!!")
})