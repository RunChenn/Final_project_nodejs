let express = require('express')
let app = express();

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

// 要渲染的檔案是哪個
app.set('view engine', 'ejs');
app.get('/', async(req, res) => {

    let data = await db.collection("classA").get();
    let userArr = [];
    data.docs.forEach((doc) => {
        userArr.push(doc.data().name);
    });

    res.render("default", {
        // users: ["Alice", "Bob", "Fisheep", "Fiona"],
        users: userArr,
        title: "This is root page!"
    })
})
app.listen(3000, () => {
    console.log("render_test server is running at http://127.0.0.1:3000")
})