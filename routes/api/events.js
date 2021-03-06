const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Event = require("../../models/Event");
const User = require("../../models/User");
const passport = require("passport");
const {
  isValidEvent,
  updateValidEvent,
} = require("../../middleware/validEvent");

router.get("/allEvents", (req, res) => {
  //events are being sent up as an array
  Event.find()
    .then((events) => {
      const results = {};
      events.forEach((event) => {
        results[event._id.toString()] = event;
      });
      res.send(results);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

router.get("/:id", (req, res) => {
  Event.findOne({ _id: req.params.id })
    .then((event) => {
      const promises = [];
      event.guests.forEach((guest) => {
        promises.push(
          User.findOne({ _id: guest }).then((user) => {
            return user.name;
          })
        );
      });
      Promise.all(promises).then((guestNames) => {
        event._doc.guests = guestNames;
        res.send(event);
      });
    })
    .catch((error) => res.status(400).json({ error: error }));
});

router.post(
  "/newEvent",
  passport.authenticate("jwt", { session: false }),
  isValidEvent,
  (req, res) => {
    Event.findOne({ name: req.body.name }).then((event) => {
      if (event) {
        let errors = { name: "This event name has already been taken" };
        return res.status(400).json(errors);
      } else {
        const newEvent = new Event({
          name: req.body.name,
          description: req.body.description,
          location: req.body.location,
          imageUrl: req.body.imageUrl,
          time: req.body.time,
          hostId: req.user.id,
        });
        newEvent
          .save()
          .then((newEvent) => {
            User.findOneAndUpdate(
              { _id: req.user.id },
              {
                $addToSet: {
                  eventsHosted: newEvent._id,
                },
              },
              { new: true }
            )
              .then((user) => res.json(newEvent))
              .catch((errors) => console.log(""));
          })
          .catch((errors) => {
            res.status(400).json(error);
          });
      }
    });
    //   .catch((error) => res.status(400).json({ error: error }));
  }
);

router.patch("/:id", updateValidEvent, (req, res) => {
  Event.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        imageUrl: req.body.imageUrl,
        time: req.body.time,
      },
      $addToSet: {
        guests: req.body.guests,
      },
    },
    { multi: true, new: true }
  )
    .then((updatedEvent) => res.json(updatedEvent))
    .catch((error) => res.status(400).json({ error: error }));
});

router.patch("/:id/guestLeave", (req, res) => {
  Event.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pull: {
        guests: req.body.guests,
      },
    },
    { new: true }
  )
    .then((updatedEvent) => res.json(updatedEvent))
    .catch((error) => res.status(400).json({ error: "something went wrong" }));
});

router.delete("/:id", (req, res) => {
  Event.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json(req.params.id);
    })
    .catch((error) => res.status(400).json({ error: error }));
});

module.exports = router;
