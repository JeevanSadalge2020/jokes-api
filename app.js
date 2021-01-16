const express = require('express')
const app = express()
const https = require('https')

const url = "https://v2.jokeapi.dev"
const categories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
const params = [
    "blacklistFlags=nsfw,religious,racist",
    "idRange=0-100"
];
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// app.get(`${url}/joke/`, (req, res) => {
//     https.get(url, (respose) => {
//         respose.on('data', (data) => {
//             let Data = JSON.parse(data)
//             res.render('index',{
//                 joke:Data.joke
//             })
//         })
//     })
// })

app.get('/', (req, res) => {
    res.render('main')
})
app.post('/index', (req, res) => {
    const category = req.body.category
    https.get(`${url}/joke/${category}?type=single`, (response) => {
        response.on('data', (data) => {
            let Data = JSON.parse(data)
            res.render('index', {
                joke: Data.joke
            })
        })
    })
})


app.listen(3000, () => {
    console.log("server listening on port 3000");
})