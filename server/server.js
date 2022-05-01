const express = require('express');
const colors = require('colors');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json({extended: false}));

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline.bold);
    }catch(err){
        console.log(`ERROR: ${err.message}`.bgRed.underline.bold);
        process.exit(1);
    }
}

connectDB();

app.use ('/api/users', require('./routes/userRoutes'));
app.use ('/api/blogs', require('./routes/blogRoutes'));

app.listen(PORT, () => console.info(`Server is running on port ${PORT}`.green.underline.bold));