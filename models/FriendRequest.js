const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
  requester: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = FriendRequest = mongoose.model(
  "FriendRequest",
  FriendRequestSchema
);
