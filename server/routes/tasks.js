const express = require('express');
const router = express.Router();
const Task = require('../models/task.model');
const verifyToken = require('../middleware/auth.middleware');

// Apply authentication middleware to all routes
router.use(verifyToken);

// Get all tasks for a user
router.get('/:userId', async (req, res) => {
  try {
    // Verify that the requesting user matches the userId parameter
    if (req.user.uid !== req.params.userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const tasks = await Task.find({ userId: req.params.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  // Verify that the user is creating a task for themselves
  if (req.user.uid !== req.body.userId) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    urgent: req.body.urgent,
    important: req.body.important,
    userId: req.body.userId
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    // Verify that the user owns the task
    if (task.userId !== req.user.uid) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    Object.assign(task, req.body);
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    // Verify that the user owns the task
    if (task.userId !== req.user.uid) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Batch update tasks
router.post('/batch', async (req, res) => {
  try {
    const { tasks } = req.body;
    
    // Verify that all tasks belong to the authenticated user
    if (!tasks.every(task => task.userId === req.user.uid)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Delete all existing tasks for the user
    await Task.deleteMany({ userId: req.user.uid });
    
    // Insert all tasks
    const result = await Task.insertMany(tasks);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
