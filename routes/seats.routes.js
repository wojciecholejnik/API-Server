const express = require('express');
const router = express.Router();

const seatsController = require('../controllers/seats.controller');

router.get('/seats', seatsController.getAll);
router.get('/seats/random', seatsController.getRandom);
router.get('/seats/:id', seatsController.getById);
router.post('/seats', seatsController.post);
router.put('/seats/:id', seatsController.put);
router.delete('/seats/:id', seatsController.delete);

module.exports = router;