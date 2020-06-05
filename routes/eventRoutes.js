const express = require('express');

const router = express.Router();

const eventController = require('../controllers/eventController');

router.post('/submit',eventController.postSubmit);

router.get('/preview/:id',eventController.getEvent);

router.get('/success/:id',eventController.getRegid);

router.get('/pass/:id',eventController.getPass);

module.exports = router;  