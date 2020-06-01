const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    idUrl: {
        type: String,
        required: true
    },
    regType: {
        type: String,
        required: true
    },
    ticket:{
        type: Number,
        required: true
    },
    regDate: {
        type: Date,
        default: Date.now
    },
    uniqueId: String
});

module.exports = mongoose.model('Event', eventSchema);