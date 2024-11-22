import express from 'express'
import cors from "cors"

import authRoutes from './routes/auth.js'; // Import Routes that use db.js
// import session from 'express-session';     // Import session


//USING EXPRESS
const app = express();

//ALLOWS ANY USE OF JSON SENT BY POST METHOD
app.use(express.json())

//CORS REQUEST HANDLER
// app.use(cors())
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
}));


// app.use(session({
//   secret: 'your-secret-key',  // Replace with a strong secret key
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }   // Set secure: true for production with HTTPS
// }));



// Routes
app.use('/auth', authRoutes);



const PORT = process.env.PORT || 3001; // Use port 3001 for backend
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));