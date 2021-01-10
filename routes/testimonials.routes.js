const express = require('express');
const router = express.Router();
const app = express();
const db = require('../db');
const message = 'OK';
const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  if (req.params.id === 'random'){
    const randomInt = getRandomInt(0, (db.testimonials.length)) 
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

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials.filter(item => item.id === 1));
});

router.route('/testimonials').post((req, res) => {
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

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  let edit = db.testimonials.find(item => item.id === req.params.id)
  edit.author = author;
  edit.text = text;
  res.json(message);
});

router.route('/testimonials/:id').delete((req, res) => {
  const toDelete = db.testimonials.filter(item => item.id === req.params.id);
  db.testimonials.splice(toDelete, 1);
  res.json(message);
});

module.exports = router;