require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts')

const app = express();

//middleware
app.use(express.json())

//routes
app.use('/api/workouts', workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(3000, () => {
        console.log('listening');
    })
})
.catch((error) => {
    console.log(error);
})