const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Event = require("../../models/Event");
const passport = require("passport");
const EventInvitation = require("../../models/EventInvitation");

router.get("/test", (req, res) => {
  res.json("this is the event invitation test route");
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    errors = {};
    Event.findOne({ event: req.body.event }).then((event) => {
      if (!event) {
        errors.recipient = "Can not find the event";
        return res.status(400).json(errors);
      } else {
        const newInvite = new EventInvitation({
          inviter: req.user.id,
          recipient: req.body.recipient,
          event,
        });
        newInvite
          .save()
          .then((invite) => {
            res.json(invite);
          })
          .catch((err) => res.json(err));
      }
    });
  }
);

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    EventInvitation.findOneAndUpdate(
      { recipient: req.user.id },
      { status: req.body.status },
      { new: true }
    ).then((invite) => {
      if (invite.status === "accepted") {
        //add recipient to the event guest list
        //add event to user's joinedEvents

        Event.findOneAndUpdate(
          { _id: invite.event },
          { $addToSet: { guests: req.user.id } }
        ).then();

        User.findOneAndUpdate(
          { _id: req.user.id },
          { $addToSet: { eventsJoined: invite.event } },
          { new: true }
        )
          .then((updatedUser) =>
            res.json({
              id: updatedUser.id,
              name: updatedUser.name,
              email: updatedUser.email,
              eventsJoined: updatedUser.eventsJoined,
              eventsHosted: updatedUser.eventsHosted,
              friends: updatedUser.friends,
            })
          )
          .catch((err) => console.log(err));
      } else {
        //delete this invite
        EventInvitation.deleteOne({ _id: invite.id })
          .then((res) => res.json("hope to see you in the next event!"))
          .catch((err) => console.log(err));
      }
    });
  }
);

module.exports = router;
