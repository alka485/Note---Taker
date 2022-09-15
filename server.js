const express = require("express");
const path = require('path');
const fs = require('fs');
const dbData = require('./db/db.json');

const app = express();
const PORT = 3005;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/notes' , function (req, res) {
    res.sendFile(path.join(__dirname,'public/notes.html'));
});

app.get('/' , function (req, res) {
  res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/api/notes',(req, res) => res.json(dbData));
    

app.post('/api/notes', (req, res)=>{
    res.json(`${req.method} request received`);
    console.info(req.rawHeaders);

  // Log our request to the terminal
  console.info(`${req.method} request received`);

})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


