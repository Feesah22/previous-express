// access the express modules
const express = require('express')
//app is telling us to run express function 
const app = express()
// declaring a variable to breakup a string into a object //built in express  
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
//declaring variables to use later 
var db, collection;
// url that connects to 
//const url = "mongodb+srv://demo:demo@cluster0-q2ojb.mongodb.net/test?retryWrites=true";
const url = 'mongodb+srv://feesah22:homework@cluster0.hq8d4.mongodb.net/?retryWrites=true&w=majority';
const dbName = "expressPrevious"

app.listen(5000, () => { //listening to port waiting for server to be run 
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            console.log("listen 5000")
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });//lets us know we have sucessful connected to the database
});

app.set('view engine', 'ejs') //has to come befor any app. files so HTML can be rendered

//These two lines is needed to look at the request body
app.use(bodyParser.urlencoded({ extended: true }))//body parser will be applied to the url
app.use(bodyParser.json()) //body parser will be applied to stringified JSON
app.use(express.static('public')) //anything in the public folder, it is ran on server immediately no route needed

 app.get('/', (req, res) => {// get request for when the page is loaded and url contains "/" or invisible slash (home page) 
db.collection('ToDo').find().toArray((err, result) => { //gathering all the messages in the database and putting them into an //collection name is the "message in MongoDb array 
    if (err) return console.log(err) // is something is wrong please tell me 
    res.render('index.ejs', { toDos: result })//) //put messages object (can call message whatever we want its random) into index.ejs so that it will render the messages on dom 
      })
     })
 

app.post('/postToDo', (req, res) => { //post to do is from the li in the ejs
    db.collection('ToDo').insertOne({  description: req.body.input, completed: false}, (err, result) => {             
        if (err) return console.log(err)
         console.log('saved to database')
         res.redirect('/')
     })
 })

// app.put('/messages', (req, res) => { //update request after some action 
//     db.collection('messages')
//         .findOneAndUpdate({ name: req.body.name, msg: req.body.msg }, { //we are finding the name /message in the db that matches the name/message targeted by main.js event
//             $set: {
//                 thumbUp: req.body.thumbUp + 1 //this adds the thumbup   
//             }
//         }, {
//             sort: { _id: -1 },
//             upsert: true
//         }, (err, result) => {
//             if (err) return res.send(err)
//             res.send(result)
//         })
// })


// app.put('/messagesone', (req, res) => { //update request after some action 
//     db.collection('messages')
//         .findOneAndUpdate({ name: req.body.name, msg: req.body.msg }, { //we are finding the name /message in the db that matches the name/message targeted by main.js event
//             $set: {
//                 thumbUp: req.body.thumbUp - 1//this adds the thumbup   
//             }
//         }, {
//             sort: { _id: -1 },
//             upsert: true
//         }, (err, result) => {
//             if (err) return res.send(err)
//             res.send(result)
//         })
// })

app.delete('/toDoDelete', (req, res) => { //a delete request 
     db.collection('ToDo').findOneAndDelete({ description: req.body.input}, (err, result) => { // find matching name/message object in database 
        if (err) return res.send(500, err)
        res.send('Message deleted!')
   })
})
