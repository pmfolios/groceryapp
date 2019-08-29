const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const GrocerySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  lists: {
    type: [String],
    required: true
  },
  bought: {
    type: Boolean,
    default: false
  },
  boughtCounter: {
    type: Number,
    default: 0
  },
  timePeriodTracker: {
    type: Array,
    default: []
  },
  stringTimePerTracker: {
    type: Array,
    default: []
  },
  avgTimePeriod: {
    type: Number,
    default: 604800 //Set to a week in seconds
  }
});

//Create a model
const Grocery = mongoose.model('grocery', GrocerySchema);

//Export the model
module.exports = Grocery;
