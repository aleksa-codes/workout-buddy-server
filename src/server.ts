require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts');

// invoke an instance of express application
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use((req: any, res: any, next: any) => {
  console.log(`${new Date().toString()} => ${req.path}`, req.method);
  next();
});

// routes
app.use('/api/workouts', workoutRoutes);

// connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to database and listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((err: any) => console.error('Could not connect to MongoDB...', err));
