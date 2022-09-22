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
const PORT = process.env.PORT || 3005;

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

const readFile = (file) => {
  let parsedData = null;
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
       parsedData = JSON.parse(data);
      console.log(parsedData);
      
    }
  });

  return parsedData;

}

app.get('/notes' , function (req, res) {
    res.sendFile(path.join(__dirname,'public/notes.html'));
});

app.get('/' , function (req, res) {
  res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/api/notes',(req, res) => {

  fs.readFile("./db/db.json", 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const  parsedData = JSON.parse(data);
      console.log(parsedData);
      res.json(parsedData);
      
    }
  });

});
    

app.post('/api/notes', (req, res)=>{
    const{ title,text }= req.body;

  if(req.body){
    const dbNote = {
      title,
      text,
    };
    //console.log(dbNote);
    readAndAppend(dbNote, './db/db.json');
    res.send('db added successfully');
  }else{
    res.error('Error in adding');
  }
});

// app.delete('/api/notes/:id',(req,res)=>{
  
//   let db = JSON.parse(fs.readFileSync('db/db.json'))
//     // removing note with id
//     let deleteNotes = db.filter(item => item.id !== req.params.id);
//     // Rewriting note to db.json
//     fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
//     res.json(deleteNotes);
    

  
// })

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


