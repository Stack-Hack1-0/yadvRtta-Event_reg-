const uniqid = require('uniqid');
const Event = require("../models/event");

exports.postSubmit = (req,res,next) => {
    const name = req.body.name;
    const mobile = req.body.mob;
    const email = req.body.em;
    const file = req.file;
    const regType = req.body.reg;
    const ticket = req.body.tik;

    console.log(name,mobile,email,file,regType,ticket);


    let idUrl = file.path.replace("\\","/");
    const event = new Event({
        fullname: name,
        mobile: mobile,
        email: email,
        idUrl: idUrl,
        regType: regType,
        ticket: ticket
    });
    event.save()
    .then(result => {
        console.log("created an event");
        console.log(result);
        res.send(result);
    })
    .catch(err => console.log(err));
};

exports.getEvent = (req,res,next) => {
    const eventId = req.params.id;
    Event.findOne({_id: eventId})
    .then(events=> {
        console.log(events);
        res.send(events);
    })
    .catch(err => console.log(err));
};

exports.getUniqid = (req,res,next) => {
    const eventId = req.params.id;
    let uniqId;
    Event.findById({_id: eventId})
    .then(event => {
        console.log(event);
        uniqId = uniqid('event-');
        event.uniqId= uniqId;
        return event.save();
    })
    .then(result => {
        console.log(uniqId);
        res.send(uniqId);
    })
    .catch(err => console.log(err));
}