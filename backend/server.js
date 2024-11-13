const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Routes that use db.js



const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true, // Allow cookies
}));

// Routes
app.use('/auth', authRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const PORT = process.env.PORT || 3001; // Use port 3001 for backend
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
