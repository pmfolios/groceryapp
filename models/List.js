const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  }
});

//Create a model
const List = mongoose.model('list', ListSchema);

//Export the model
module.exports = List;
