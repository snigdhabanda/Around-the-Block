const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventInvitationSchema = new Schema(
  {
    inviter: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "events",
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = EventInvitation = mongoose.model(
  "EventInvitation",
  EventInvitationSchema
);
