let express = require('express');
let firebase = require('firebase')
var firebaseConfig = {
    apiKey: "AIzaSyCjdBEJFC4UdjIhoXx4qslrjx7G1yqyJv8",
    authDomain: "run-chen.firebaseapp.com",
    databaseURL: "https://run-chen.firebaseio.com",
    projectId: "run-chen",
    storageBucket: "run-chen.appspot.com",
    messagingSenderId: "366645597462",
    appId: "1:366645597462:web:56d7c6ff86709f36202c37",
    measurementId: "G-5B8DZEL2PR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.get('/', async(req, res) => {
    let data = await db.collection('classA').get();
    let userArr = []
    data.forEach((doc) => {
        console.log(doc.data().name)
        userArr.push(doc.data().name);
    })
    res.render('default', {
        title: '首頁',
        // users: ['Fisheep', 'Fiona', 'Alice', 'Bob']
        users: userArr
    });
});

app.get("/runchen", (req, res) => {

    res.send("<h1>RunChen</h1>")
})

app.get("/firebase-test", async(req, res) => {
    let html = '';
    let data = await db.collection('classA').get();
    data.forEach(doc => {
        console.log(doc.data());
        html += `<div>${doc.id}: name = ${doc.data().name} age = ${doc.data().age}</div>`;
    });
    res.send(html)
})

app.get("/classA_backend", async(req, res) => {
    let data = await db.collection('classA').get();
    userArr = []
    data.forEach((doc) => {
        console.log(doc.id)
        userArr.push({
            id: doc.id,
            name: doc.data().name,
            age: doc.data().age,
            gender: doc.data().gender
        })
    })
    res.render('classA', {
        users: userArr
    })
})

app.get("/classA_frontend", (req, res) => {
    let options = {
        root: __dirname + "/public",
        dotfiles: 'ignore'
    }
    console.log(__dirname + "/public");
    res.sendFile("/classA.html", options);
})

app.get('/who/:name', (req, res) => {
    var name = req.params.name;
    console.log(name)
    res.send(`This is ${name}`);
});

app.get('/API/deleteMember', (req, res) => {
    db.collection('classA').doc(req.query.id).delete();
    console.log(req.query.id);
    res.send(`delete Member id = ${req.query.id}!`)
})

app.get('/API/addMember', (req, res) => {
    db.collection('classA').add({
        name: req.query.name,
        gender: req.query.age,
        age: req.query.gender
    });
    console.log("Add member !!");
    res.send("Add member success!");
})

app.get('*', (req, res) => {
    res.send('No Content');
});

// node.js會找有沒有設定port給他， 如果沒有會給3000
let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening on port 3000');
});

// github連結跟heroku網址