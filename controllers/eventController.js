const uniqid = require('uniqid');
const Event = require("../models/event");

exports.postSubmit = (req,res,next) => {
    const name = req.body.name;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const id = req.file;
    const regType = req.body.regType;
    const ticket = req.body.ticket;

    const idUrl = id.path;

    const event = new Event({
        fullname: name,
        mobile: mobile,
        email: email,
        idUrl: idUrl,
        regType: regType,
        ticket: ticket
    });
    event.save()
    .then(res => {
        console.log("created an event");
        return event.find();
    })
    .then(events => {
        console.log(events);
        res.send(events);
    })
    .catch(err => console.log(err));
};

exports.eventRegister = (req,res,next) => {
    const eventId = req.params.id;
    Event.findOne({_id: eventId})
    .then(events=> {
        console.log(events);
        events.uniqId = uniqid('event-','-reg');
        return events.save();
    })
    .then(res => {
        console.login("regid created!");
    })
    .catch(err => console.log(err));
};