const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//consider doing the events, friends in the []
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    eventsJoined: [
      {
        type: Schema.Types.ObjectId,
        ref: "events",
      },
    ],

    eventsHosted: [
      {
        type: Schema.Types.ObjectId,
        ref: "events",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
