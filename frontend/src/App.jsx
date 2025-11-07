import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:slug" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}
