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