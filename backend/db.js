const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const api = process.env.MONGO_URI;


const connectDB = async () => {
  try{
    await mongoose.connect(api);
    console.log('mongodb connected')
  }
  catch(err){
    console.log(err.message);
    process.exit(1);
  }
}


module.exports = connectDB;