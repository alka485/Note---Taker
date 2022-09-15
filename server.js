const express = require("express");
const path = require('path');
const fs = require('fs');
const dbData = require('./db/db.json');

const uuid = require('./helpers/uuid');

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */

const app = express();
const PORT = 3005;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

app.get('/notes' , function (req, res) {
    res.sendFile(path.join(__dirname,'public/notes.html'));
});

app.get('/' , function (req, res) {
  res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/api/notes',(req, res) => res.json(dbData));
    

app.post('/api/notes', (req, res)=>{
  console.info(`${req.method} request received to add a review`);

  const{ noteTitle,noteText }= req.body;

  if(req.body){
    const dbNote = {
      noteTitle,
      noteText,
      //note_id :uuid(),

    };
    
    readAndAppend(dbNote, './db/db.json');
    res.json('db added successfully');
  }else{
    res.error('Error in adding');
  }
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


