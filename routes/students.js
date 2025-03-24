const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Create a new student
router.post('/', async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const [result] = await db.execute(
      'INSERT INTO Students (name, age, email) VALUES (?, ?, ?)',
      [name, age, email]
    );
    res.json({ student_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Students');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a student by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM Students WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a student
router.put('/:id', async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const [result] = await db.execute(
      'UPDATE Students SET name = ?, age = ?, email = ? WHERE id = ?',
      [name, age, email, req.params.id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json({ message: 'Student updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.execute(
      'DELETE FROM Students WHERE id = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json({ message: 'Student deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;