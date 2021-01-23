const express = require('express');
const router = express.Router();

const testimonialsController = require('../controllers/testimonials.controller');

router.get('/testimonials', testimonialsController.getAll);
router.get('/testimonials/random', testimonialsController.getRandom);
router.get('/testimonials/:id', testimonialsController.getById);
router.post('/testimonials', testimonialsController.post);
router.put('/testimonials/:id', testimonialsController.put);
router.delete('/testimonials/:id', testimonialsController.delete);

module.exports = router;