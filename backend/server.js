import express from 'express'
import cors from "cors"

import authRoutes from './routes/auth.js'; // Import Routes that use db.js
import session from 'express-session';
import cookieParser from 'cookie-parser'

//USING EXPRESS
const app = express();

//STORE SESSION IN MEMORY
const store = new session.MemoryStore();
//CREATE SESSION
//app.use(cookieParser());
app.use(cookieParser("secretKey"));

app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    store,
    // cookie: { 
    //   maxAge: 60000 * 60},
    cookie: {
      maxAge: 60000 * 60,  // 1 hour
      httpOnly: true,      // Prevents client-side JS from accessing the cookie
      secure: false,       // Set to true if using HTTPS
      path: '/'            // Ensure the path is set to '/' to make the cookie accessible site-wide
    }
  }))
  
//ALLOWS ANY USE OF JSON SENT BY POST METHOD
app.use(express.json())

//CORS REQUEST HANDLER
// app.use(cors())
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],            // Allowed HTTP methods
    credentials: true   
}));

// Routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3001; // Use port 3001 for backend
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

//CHECK IF SESSION WORKS
app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.sessionID);
  req.session.visited = true;
  res.cookie("Hello", "World", { maxAge: 30000, signed: true});
  res.status(201).send({msg:"Hello"});
});

