// Le Quang Nhat - CE190875 - Assignment 2 - Bug Report Management

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connection successful');
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;


