const express = require('express');
const router = express.Router();

const concertsController = require('../controllers/concerts.controller');


router.get('/concerts', concertsController.getAll);
router.get('/concerts/random', concertsController.getRandom);
router.get('/concerts/:id', concertsController.getById);
router.post('/concerts', concertsController.post);
router.put('/concerts/:id', concertsController.put);
router.delete('/concerts/:id', concertsController.delete);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const app = express();
// const db = require('../db');
// const message = 'OK';
// const { v4: uuidv4 } = require('uuid');
// const multer = require('multer');
// const upload = multer();


// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


// router.route('/concerts').get((req, res) => {
//   res.json(db.concerts);
// });

// router.route('/concerts/:id').get((req, res) => {
//   if (req.params.id === 'random'){
//     const randomInt = getRandomInt(0, (db.concerts.length)) 
//     res.json(db.concerts[randomInt]);
//   } else {
//     const finded = db.concerts.filter(item => item.id == req.params.id );
//     if (finded.length > 0){
//       res.json(finded);
//     } else {
//       res.json('Not found ...')
//     }
//   }
// });

// router.route('/concerts/random').get((req, res) => {
//   res.json(db.concerts.filter(item => item.id === 1));
// });

// router.route('/concerts').post(upload.single('image'), (req, res) => {
//   const { performer, genre, price, day } = req.body;
//   const  image  = req.file
//   if(performer && genre && price && day) {
//     db.concerts.push({
//       performer: performer,
//       genre: genre,
//       price: price,
//       day: day,
//       id: uuidv4(),
//       image: image.originalname,
//     });
//   } else {
//     res.json('complete all fields')

//   }

//   return res.json(message);
// });

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min;
// }

// router.route('/concerts/:id').put(upload.single('image'),(req, res) => {
//   const { performer, price, day, } = req.body;
//   const image = req.file;
//   let edit = db.concerts.find(item => item.id == req.params.id)
//   performer ? edit.performer = performer : '';
//   price ? edit.price = price : '';
//   day ? edit.day = day : '';
//   image ? edit.image = image.originalname : '';

//   res.json(message);
// });

// router.route('/concerts/:id').delete((req, res) => {
//   const toDelete = db.concerts.filter(item => item.id == req.params.id);
//   db.concerts.splice(toDelete, 1);
//   res.json(message);
// });

// module.exports = router;