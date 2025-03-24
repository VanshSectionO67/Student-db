const express = require('express');
const studentsRouter = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use('/students', studentsRouter);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Student Database Management System API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});