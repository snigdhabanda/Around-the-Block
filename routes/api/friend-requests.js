const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const passport = require("passport");
const FriendRequest = require("../../models/FriendRequest");

router.get("/test", (req, res) => {
  res.json("this is the friendrequest test route");
});

router.get(
  "/friendinvites",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //only want to get the invites
    FriendRequest.find({ recipient: req.user.id })
      .then((results) => res.json(results))
      .catch((err) => res.json(err));
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //only want to get the invites
    FriendRequest.find({ requester: req.user.id })
      .then((results) => res.json(results))
      .catch((err) => res.json(err));
  }
);

router.post(
  "/newFriendRequest",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    debugger
    errors = {};
    FriendRequest.findOne({
      requester: req.user.id,
      recipient: req.body.recipient,
    }).then((record) => {
      if (record) {
        errors.recipient = "Already sent friend request to this person";
        return res.status(400).json(errors);
      } else {
        const newRequest = new FriendRequest({
          requester: req.user.id,
          recipient: req.body.recipient,
          status: "pending"
        });
        newRequest
          .save()
          .then((request) => {
            res.json(request);
          })
          .catch((err) => res.json(err));
      }
    });
  }
);

router.patch(
  "/updateFriendRequest",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    debugger
    FriendRequest.findOneAndUpdate(
      { recipient: req.user.id, requester: req.body.requester},
      { status: req.body.status },
      { new: true }
    ).then((record) => {
      if (record.status === "approved") {
        // trigger update requester
        // trigger update recipient
        User.findOneAndUpdate(
          { _id: record.requester },
          {
            $addToSet: {
              friends: record.recipient,
            },
          },
          { new: true }
        );

        User.findOneAndUpdate(
          { _id: record.recipient },
          {
            $addToSet: {
              friends: record.requester,
            },
          },
          { new: true }
        )
          .then((updatedUser) => res.json(updatedUser))
          .catch((err) => res.json(err));
      } else {
        //delete this record
        FriendRequest.deleteOne({ _id: record.id })
          .then((res) => res.json("you are not friends anymore :("))
          .catch((err) => res.json(err));
      }
    });
  }
);

module.exports = router;
