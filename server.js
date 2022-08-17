const express = require("express");
const path = require('path');
const fs = require('fs');
const dbData = require('./db/db.json');

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/notes' , function (req, res) {
    res.sendFile(path.join(mainDir,"notes.html"));
});

app.get('/api/notes', function(req, res){
    res.sendFile(path.join(__dirname, dbData));
});



