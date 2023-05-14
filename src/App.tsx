import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Chocolate from "./pages/Chocolate";
import Cookies from "./pages/Cookies";
import Biscuits from "./pages/Biscuits";
import Candies from "./pages/Candies";
import Cakes from "./pages/Cakes";
import "./css/App.css";
import ProductPage from "./pages/ProductPage";
import Header from "./pages/Header";
import Cart from "./pages/Cart";
import { CookiesProvider } from "react-cookie";

enum ConfectioneryType {
  Chocolate = "Chocolate",
  Cookies = "Cookies",
  Biscuits = "Biscuits",
  Candies = "Candies",
  Cakes = "Cakes"
}

export default function App() {

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="chocolate" element={<Chocolate />} />
            <Route path="cookies" element={<Cookies />} />
            <Route path="biscuits" element={<Biscuits />} />
            <Route path="candies" element={<Candies />} />
            <Route path="cakes" element={<Cakes />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
        <ProductPage />
      </BrowserRouter>
    </CookiesProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
