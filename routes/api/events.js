const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const Event = require('../../models/Event');
const validateEventInput = require('../../validations/event');
const validateEventUpdate = require('../../validations/event');

router.get("/allEvents", (req, res) => {
  //events are being sent up as an array
    Event.find().then(events => {
        res.send(events); 
    }).catch(err => console.log(err));
});


router.get("/:id", (req, res) => {
    const event = Event.findOne({_id: req.params.id}).exec();
    event.then(function (doc) {res.send(doc)})
})

router.post("/newEvent", (req, res) => {
    console.log(req.body)
    const { errors, isValid } = validateEventInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    Event.findOne({ name: req.body.name }).then(event => {
        if (event) {
            errors.name = "This event name has already been taken";
            return res.status(400).json(errors);
        } else {
          const newEvent = new Event({
            name: req.body.name,
            description: req.body.description,
            lat: req.body.lat,
            long: req.body.long,
            imageUrl: req.body.imageUrl,
            time: req.body.time
        })
        newEvent.save().then(newEvent => {
            res.json(newEvent)
        }).catch(err => console.log(err))
        
    }
    
    
}).catch(err => console.log(err))
});

router.patch("/:id", (req, res) => {
    console.log(req.body)
    
    const { errors, isValid } = validateEventInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    Event.findOneAndUpdate(
        { _id: req.params.id },
        {$set: {
            name: req.body.name,
            lat: req.body.lat,
            long: req.body.long, 
            description: req.body.description,
            time: req.body.time,

        },
        $addToSet: {
            guests: req.body.guests
        }},
        {multi: true, new: true}
    ).then(
        updatedEvent => res.json(updatedEvent)
        )
    .catch(
        err => console.log(err)
    )
});

router.delete("/:id", (req, res) => {
    Event.deleteOne(
        {_id: req.params.id}
    ).then(() => {
        res.status(200).json({message: "Event has been deleted!"})
    })
    .catch(err => res.status(400).json({error: error}))
})
        


module.exports = router;