const express = require('express');
const productRoute = require('./routes/ProductRoute')
const cors  = require('cors');
const connectDB = require('./db');
const dotenv = require('dotenv');
dotenv.config();


const app = express();

connectDB();

app.use(express.json())
app.use(cors({
  origin: 'https://1-fi-sde-1-assignment.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))


app.use('/images', express.static('images'));

app.use('/api/products', productRoute);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

