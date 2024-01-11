const dotenv = require('dotenv');
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        await mongoose.connect(MONGO_URI);
        return "connected to db";
    } catch (error) {
        return error;
    }
}

module.exports = connectDB;