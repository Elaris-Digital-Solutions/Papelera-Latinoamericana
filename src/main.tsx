import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/products/ProductPage';

createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="*" element={<App />} />
      <Route path="/product/:productId" element={<ProductPage />} />
    </Routes>
  </Router>
);
