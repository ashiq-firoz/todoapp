require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define Todo Schema
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new todo
app.post('/todos', async (req, res) => {
  try {
    const { text } = req.body;
    const newTodo = new Todo({ text });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Toggle todo completion
app.patch('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update todo text
app.put('/todos/:id', async (req, res) => {
  try {
    const { text } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { text }, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Clear completed todos
app.delete('/todos', async (req, res) => {
  try {
    await Todo.deleteMany({ completed: true });
    res.json({ message: 'Completed todos cleared' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Define User Schema
const userDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNumber: { type: String, required: true },
    bio: { type: String, required: true }
  });
  
  const UserDetails = mongoose.model('UserDetails', userDetailsSchema);
  
  // Fetch user details
  app.get('/details', async (req, res) => {
    try {
      const details = await UserDetails.findOne();
      res.json(details || null);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
