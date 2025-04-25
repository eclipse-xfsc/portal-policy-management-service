const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const f = require('util').format
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var dbAddr = process.env.DB_ADDR
var user = encodeURIComponent(process.env.DB_USER);
var password = encodeURIComponent(process.env.DB_PASS);
var authMechanism = process.env.DB_AUTH;
var dbName = process.env.DB_NAME

if (dbAddr == "undefined") {
    console.error("No DB Addr set")
    return
}

if (dbAddr == "undefined") {
    console.error("No DB Addr set")
    return
}

var url = f('mongodb://%s', dbName);

let db

if (user != 'undefined' && password != 'undefined' && authMechanism != 'undefined') {
    console.log("Auth Connection")
    url = f('mongodb://%s:%s@%s&authMechanism=%s',
        user, password, dbAddr, authMechanism);
    console.log(user)
    console.log(dbAddr)
    console.log(authMechanism)
}

const init = MongoClient.connect(url, (err, client) => {
    if (err != null) {
        console.log(err);
    } else {
        console.log("db connected.")
    }
}).then((client) => {
    db = client.db(dbName)
})


app.listen(3000, function () {
    console.log('listening on 3000')
})

app.get('/isAlive', (req, res) => {
    res.send('OK')
})

app.post('/', (req, res) => {
    try {
        const collection = db.collection('policies')
        collection.insertOne(req.body).then((obj) => {
            res.send(obj).status(200).end()
        })
    }
    catch (error) {
        res.send(error).status(400).end()
    }
})

app.delete('/:id', (req, res) => {
    try {
        const collection = db.collection('policies')
        collection.deleteOne({ _id: new ObjectId(req.params.id) }).then((obj) => {
            res.send(obj).status(200).end()
        })
    } catch (error) {
        res.send(error).status(400).end()
    }
})

