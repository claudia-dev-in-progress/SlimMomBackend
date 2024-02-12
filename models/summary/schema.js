const { Schema, model } = require("mongoose");

const summary = new Schema({
  date: String,
  kcalLeft: Number,
  kcalConsumed: Number,
  percentsOfDailyRate: Number,
  dailyRate: Number,
  userId: Schema.Types.ObjectId,
});

const Summary = model("summary", summary);

module.exports = Summary;
