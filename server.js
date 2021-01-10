const express = require('express');
const app = express();
const db = require('./db');
const message = 'OK';
const { v4: uuidv4 } = require('uuid');

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
  if (req.params.id === 'random'){
    const randomInt = getRandomInt(0, (db.testimonials.length)) 
    console.log('randomInt: ', randomInt);
    res.json(db.testimonials[randomInt]);
  } else {
    const finded = db.testimonials.filter(item => item.id == req.params.id );
    if (finded.length > 0){
      res.json(finded);
    } else {
      res.json('Not found ...')
    }
  }
});

app.get('/testimonials/random', (req, res) => {
  res.json(db.testimonials.filter(item => item.id === 1));
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  db.testimonials.push({
    author: author,
    text: text,
    id: uuidv4(),
  });

  return res.json(message);
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  let edit = db.testimonials.find(item => item.id === parseInt(req.params.id))
  edit.author = author;
  edit.text = text;
  res.json(message);
});

app.delete('/testimonials/:id', (req, res) => {
  const toDelete = db.testimonials.filter(item => item.id === req.params.id);
  const indexOf = db.testimonials.indexOf(toDelete);
  db.testimonials.splice(indexOf, 1);
  res.json(message);
});

app.use((req, res) => {
  res.status(404).json('Not found...');
});
