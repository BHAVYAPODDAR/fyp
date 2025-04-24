const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  walletAddress: { type: String },
  cid: {
    type: [
      {
        sr: { type: Number, required: true },
        cid_value: { type: String, required: true },
      },
    ],
    default: [],
  },
  questionnaire: {
    type: mongoose.Schema.Types.Mixed, // allows anything nested
    default: {},
  },
});

module.exports = mongoose.model("User", userSchema);
