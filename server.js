const express = require("express");
const path = require('path');
const fs = require('fs');
const dbData = require('./db/db.json');

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());