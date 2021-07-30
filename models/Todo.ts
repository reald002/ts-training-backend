import mongoose from 'mongoose';
const { Schema } = mongoose;

const todosScheme = new Schema({
  text: {
    type: String,
    required: true
  },
  isChecked: {
    type: Boolean,
    default: false
  },
});

const Todos = mongoose.model('todos', todosScheme);
export default Todos;
