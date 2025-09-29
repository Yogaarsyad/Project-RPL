// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes
const userRoutes = require('./src/routes/userRoutes');
const foodLogRoutes = require('./src/routes/foodLogRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Mengizinkan request dari frontend
app.use(express.json()); // Mengizinkan body parser untuk JSON

// Routes
app.use('/api/users', userRoutes);
app.use('/api/food-logs', foodLogRoutes);

app.get('/', (req, res) => {
  res.send('API LifeMon Berjalan...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));