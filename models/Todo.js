const mongoose = require('mongoose');
const { Schema } = mongoose;

const todosScheme = new Schema({
  text: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  },
});

const Todos = mongoose.model('Todos', todosScheme);
module.exports = Todos;
