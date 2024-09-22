import Todos from "../Modals/todoModal.js";


export const createTodo = async (req, res) => {
  try {
    console.log(req.body.fields,'req.body.fields');
    
    const todo = new Todos({
      fields: req.body.fields,
    });
    await todo.save();
    res.status(201).json({todo,message:"Todo Added "});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todos.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTodo = await Todos.findByIdAndUpdate(id, { fields: req.body }, { new: true });
      res.status(200).json({ message: "Todo updated", todo: updatedTodo });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

export const deleteTodo = async (req, res) => {
    try {
      const { id } = req.params;
      await Todos.findByIdAndDelete(id);
      res.status(200).json({ message: "Todo deleted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  