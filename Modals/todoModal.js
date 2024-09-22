// // models/Todo.js
// import mongoose from 'mongoose';

// const TodoSchema = new mongoose.Schema({
//   fields: [
//     {
//       type: {
//         type: String,
//         required: true, // e.g., text, number, date, textarea, select, checkbox, radio
//       },
//       name: {
//         type: String,
//         required: true, // e.g., field1, field2
//       },
//       options: {
//         type: [String], // Only applicable for select, checkbox, or radio types
//         default: [],
//       },
//       value: {
//         type: mongoose.Schema.Types.Mixed, // To accommodate various types of values
//         default: null,
//       },
//     },
//   ],
// }, { timestamps: true });

// const Todo = mongoose.model('Todo', TodoSchema);
// export default Todo;
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  fields: {
    type: Object, // Change from String to Object
    required: true,
  },
});

const Todos = mongoose.model('Todo', TodoSchema);
export default Todos;
