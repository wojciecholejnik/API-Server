const express = require('express');
const router = express.Router();
const app = express();
const db = require('../db');
const message = 'OK';
const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  if (req.params.id === 'random'){
    const randomInt = getRandomInt(0, (db.seats.length)) 
    res.json(db.seats[randomInt]);
  } else {
    const finded = db.seats.filter(item => item.id == req.params.id );
    if (finded.length > 0){
      res.json(finded);
    } else {
      res.json('Not found ...')
    }
  }
});


router.route('/seats').post((req, res) => {
  const { client, seat, email, day } = req.body;
  
  const seatBooked = db.seats.find(item => item.day == req.body.day && item.seat == req.body.seat);

  if (seatBooked) {
      res.status(403).json({ message: 'The slot is already taken...' });
  } else {
    if(client && seat && email && day ) {
      db.seats.push({
        id: uuidv4(),
        day: day,
        seat: seat,
        client: client,
        email: email,
      });
    } else {
      res.json('complete all fields')
    }
  }

  return res.json(message);
});


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

router.route('/seats/:id').put((req, res) => {
  const { client, seat, email, day } = req.body;
  let edit = db.seats.find(item => item.id == req.params.id)
  client ? edit.client = client : '';
  seat ? edit.seat = seat : '';
  day ? edit.day = day : '';
  email ? edit.email = email : '';

  res.json(message);
});

router.route('/seats/:id').delete((req, res) => {
  const toDelete = db.seats.filter(item => item.id == req.params.id);
  db.seats.splice(toDelete, 1);
  res.json(message);
});

module.exports = router;