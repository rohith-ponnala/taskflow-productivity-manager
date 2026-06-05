const Todo = require("../models/Todo");
const Activity = require("../models/Activity");


// Create Todo
exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
  title: req.body.title,
  description: req.body.description,
  category: req.body.category,
  priority: req.body.priority,
  dueDate: req.body.dueDate,
  status: "Todo",
  user: req.user.id,
});
await Activity.create({
  user: req.user.id,
  action: "Created Task",
  task: todo.title,
});

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get All Todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Update Todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

   if (req.body.status === "Completed") {

  await Activity.create({
    user: req.user.id,
    action: "Completed Task",
    task: updatedTodo.title,
  });

}

res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Delete Todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
await Activity.create({
  user: req.user.id,
  action: "Deleted Task",
  task: todo.title,
});

await todo.deleteOne();

    res.status(200).json({
      message: "Todo Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};