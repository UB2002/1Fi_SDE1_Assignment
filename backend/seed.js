const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Product = require('./schema/Product');

const products = [
  {
    name: "Apple iPhone 17 Pro",
    slug: "iphone-17-pro",
    description: "Apple iPhone 17 Pro with A19 Bionic chip and advanced camera system.",
    variants: [
      {
        color: "Silver",
        storage: "256GB",
        price: 129999,
        mrp: 139999,
        image: "/images/iphone17-silver.jpeg",
        emiPlans: [
          { monthlyPayment: 10833, tenure: 12, interestRate: 0, cashback: "₹2000" },
          { monthlyPayment: 5600, tenure: 24, interestRate: 10.5 },
        ],
      },
      {
        color: "Space Black",
        storage: "512GB",
        price: 149999,
        mrp: 159999,
        image: "/images/iphone17-black.jpeg",
        emiPlans: [
          { monthlyPayment: 12500, tenure: 12, interestRate: 0 },
          { monthlyPayment: 6450, tenure: 24, interestRate: 9.5 },
        ],
      },
    ],
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-s24-ultra",
    description: "Samsung Galaxy S24 Ultra with Dynamic AMOLED display and 200MP camera.",
    variants: [
      {
        color: "Titanium Gray",
        storage: "256GB",
        price: 119999,
        mrp: 129999,
        image: "/images/s24-gray.jpeg",
        emiPlans: [
          { monthlyPayment: 9999, tenure: 12, interestRate: 0 },
          { monthlyPayment: 5100, tenure: 24, interestRate: 10 },
        ],
      },
      {
        color: "Phantom Black",
        storage: "512GB",
        price: 134999,
        mrp: 144999,
        image: "/images/s24-black.jpeg",
        emiPlans: [
          { monthlyPayment: 11250, tenure: 12, interestRate: 0 },
          { monthlyPayment: 5700, tenure: 24, interestRate: 9.5, cashback: "₹1500" },
        ],
      },
    ],
  },
  {
    name: "OnePlus 13 Pro",
    slug: "oneplus-13-pro",
    description: "OnePlus 13 Pro with Snapdragon 8 Gen 3 and Fluid AMOLED display.",
    variants: [
      {
        color: "Emerald Green",
        storage: "256GB",
        price: 84999,
        mrp: 89999,
        image: "/images/oneplus13-green.jpeg",
        emiPlans: [
          { monthlyPayment: 7083, tenure: 12, interestRate: 0 },
          { monthlyPayment: 3700, tenure: 24, interestRate: 9.5 },
        ],
      },
      {
        color: "Volcanic Black",
        storage: "512GB",
        price: 94999,
        mrp: 99999,
        image: "/images/oneplus13-black.jpeg",
        emiPlans: [
          { monthlyPayment: 7916, tenure: 12, interestRate: 0, cashback: "₹1000" },
          { monthlyPayment: 4100, tenure: 24, interestRate: 10.5 },
        ],
      },
    ],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Data seeded successfully with local images!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seed error:", err);
  }
};

seedDB();
