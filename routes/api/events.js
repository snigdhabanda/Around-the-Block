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
    }).catch(error => res.status(400).json({error: error}));
});


router.get("/:id", (req, res) => {
    const event = Event.findOne({_id: req.params.id}).exec();
    event.then(function (doc) {res.send(doc)}).catch(
        error => res.status(400).json({error: error})
    )
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
            location: req.body.location,
            imageUrl: req.body.imageUrl,
            time: req.body.time
        })
        newEvent.save().then(newEvent => {
            res.json(newEvent)
        }).catch(error => res.status(400).json(error))
        
    }
    
    
}).catch(error => res.status(400).json({error: error}))
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
            description: req.body.description,
            location: req.body.location,
            imageUrl: req.body.imageUrl,
            time: req.body.time

        },
        $addToSet: {
            guests: req.body.guests
        }},
        {multi: true, new: true}
    ).then(
        updatedEvent => res.json(updatedEvent)
        )
    .catch(
        error => res.status(400).json({error: error})
    )
});

router.delete("/:id", (req, res) => {
    Event.deleteOne(
        {_id: req.params.id}
    ).then(() => {
        res.status(200).json({message: "Event has been deleted!"})
    })
    .catch(error => res.status(400).json({error: error}))
})
        


module.exports = router;