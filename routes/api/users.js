const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const validateUserUpdate = require("../../validations/user-update");
const validateFriend = require("../../validations/friend-validate");
const passport = require("passport");
const keys = require("../../config/keys");

//when user create an event, besides trigger event create action also trigger user update action
//also, for friendsRequest, once the friendship is built, both User need to update their friends

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "User already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = { id: user.id, name: user.name };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "This user does not exist";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, email: user.email };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      eventsPlanned: req.body.eventsPlanned,
      eventsHosted: req.body.eventsHosted,
      friends: req.body.friends,
    });
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const filter = req.body.filter;
    User.where("name")
      .all(`${filter}`)
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  }
);

//using req.user.id to ensure we are finding the user from the jwt token and even if the user change the id in the route, they won't be able to update info for someone else

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateUserUpdate(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
        },
        $addToSet: {
          friends: req.body.friends,
          eventsHosted: req.body.eventsHosted,
          eventsJoined: req.body.eventsJoined,
        },
      },
      { multi: true, new: true }
    )
      .then((updatedUser) => res.json(updatedUser))
      .catch((err) => res.json(err));
  }
);

//how to make these depedent destroy?

router.patch(
  "/:id/unfriend",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.body.friends },
      {
        $pull: {
          friends: req.body.friends,
        },
      },
      { new: true }
    );

    User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $pull: {
          friends: req.body.friends,
          // eventsJoined: req.body.eventsJoined,
          // eventsHosted: req.body.eventsHosted,
        },
      },
      { multi: true, new: true }
    )
      .then((updatedUser) => res.json(updatedUser))
      .catch((err) => res.json(err));
  }
);

module.exports = router;
