const express = require('express');

const router = express.Router();

const eventController = require('../controllers/eventController');

router.get('/register/:id',eventController.eventRegister);
router.post('/submit',eventController.postSubmit);

module.exports = router;  