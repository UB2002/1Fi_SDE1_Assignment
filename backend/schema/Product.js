const mongoose = require('mongoose');

const emiSchema = new mongoose.Schema({

    monthlyPayment: Number,
    tenure: Number,
    interestRate: Number,
    cashback: String
});


const VariantSchema = new mongoose.Schema({
    color: String,
    storage: String,
    price: Number,
    mrp: Number,
    image: String,
    emiPlans: [emiSchema],
});

const productSchema = new mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    variants: [VariantSchema],
});


module.exports = mongoose.model('product', productSchema)
