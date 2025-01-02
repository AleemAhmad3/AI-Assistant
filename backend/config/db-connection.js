const mongoose = require('mongoose');
const colors   = require('colors');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb database connected`.bgGreen.white);
        
    } catch (error) {
        console.log(`${error}.bgRed.white`);
        process.exit(1);
    }
}
module.exports = connectDB;