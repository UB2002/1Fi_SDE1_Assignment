## FI1 Store

A simple full‑stack demo store with a React frontend and Node/Express + MongoDB backend. Products support multiple variants (color/storage), dynamic images, pricing, and EMI plans.

### i. Setup and run instructions

```bash


cp backend/.env.example backend/.env   # if present; otherwise create backend/.env

cd backend && npm install
cd ../frontend && npm install

cd ../backend
node seed.js

cd backend
node server.js

cd frontend
npm run dev          # open the shown URL (e.g., http://localhost:5173)
```

Default backend URL: `http://localhost:3000`

### ii. API endpoints and example responses

- GET `/api/products`
  - Returns the list of products with their variants (color, storage, image, pricing, EMI).

Example:

```json
[
  {
    "_id": "690dd68b1683381cf80c1808",
    "name": "OnePlus 13 Pro",
    "slug": "oneplus-13-pro",
    "description": "OnePlus 13 Pro with Snapdragon 8 Gen 3 and Fluid AMOLED display.",
    "variants": [
      {
        "color": "Emerald Green",
        "storage": "256GB",
        "price": 84999,
        "mrp": 89999,
        "image": "/images/oneplus13-green.jpeg",
        "emiPlans": [
          { "monthlyPayment": 7083, "tenure": 12, "interestRate": 0 },
          { "monthlyPayment": 3700, "tenure": 24, "interestRate": 9.5 }
        ]
      },
      {
        "color": "Volcanic Black",
        "storage": "512GB",
        "price": 94999,
        "mrp": 99999,
        "image": "/images/oneplus13-black.jpeg",
        "emiPlans": [
          { "monthlyPayment": 7916, "tenure": 12, "interestRate": 0, "cashback": "₹1000" },
          { "monthlyPayment": 4100, "tenure": 24, "interestRate": 10.5 }
        ]
      }
    ]
  }
]
```

- GET `/api/products/:slug`
  - Returns a single product by slug with all variants.

Example:

```json
{
  "_id": "690dd68b1683381cf80c1808",
  "name": "OnePlus 13 Pro",
  "slug": "oneplus-13-pro",
  "description": "OnePlus 13 Pro with Snapdragon 8 Gen 3 and Fluid AMOLED display.",
  "variants": [
    {
      "color": "Emerald Green",
      "storage": "256GB",
      "price": 84999,
      "mrp": 89999,
      "image": "/images/oneplus13-green.jpeg",
      "emiPlans": [
        { "monthlyPayment": 7083, "tenure": 12, "interestRate": 0 },
        { "monthlyPayment": 3700, "tenure": 24, "interestRate": 9.5 }
      ]
    },
    {
      "color": "Volcanic Black",
      "storage": "512GB",
      "price": 94999,
      "mrp": 99999,
      "image": "/images/oneplus13-black.jpeg",
      "emiPlans": [
        { "monthlyPayment": 7916, "tenure": 12, "interestRate": 0, "cashback": "₹1000" },
        { "monthlyPayment": 4100, "tenure": 24, "interestRate": 10.5 }
      ]
    }
  ]
}
```

### iii. Tech stack used

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB (Mongoose ODM)

### iv. Schema used

Mongo/Mongoose schemas (`backend/schema/Product.js`):

```js
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
```

### Frontend behavior (variants)

- Product list pulls `/api/products` and shows primary image and price range.
- Product page pulls `/api/products/:slug` and renders all variants.
- Users can switch variants (e.g., color/storage); image, price, and EMI plans update accordingly.

### Seeding data

- File: `backend/seed.js`
- Seeds several products with multiple variants and EMI plans.
- Run: `node backend/seed.js`

### Notes

- Images are served from the backend under `/images/...`.
- Adjust ports or base URLs in the components if your environment differs.

