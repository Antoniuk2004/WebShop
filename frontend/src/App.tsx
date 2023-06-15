import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, useLocation, useNavigate, NavigateFunction } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Chocolate from "./pages/Confectionery/Chocolate";
import Cookies from "./pages/Confectionery/Cookies";
import Biscuits from "./pages/Confectionery/Biscuits";
import Candies from "./pages/Confectionery/Candies";
import Cakes from "./pages/Confectionery/Cakes";
import "./css/App.css";
import ProductPage from "./pages/CurrentPageLink";
import Header from "./data/Header";
import Cart from "./pages/Shopping_cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";


function HeaderWithLocation() {
  const location = useLocation();
  const navigate = useNavigate()
  const hideHeader = location.pathname === "/checkout";
  var header = document.getElementById("header")
  var navbar = document.getElementById("navbar")


  function changebackground(style: string) {
    var body = document.getElementById("body")
    if (body) body.style.backgroundImage = style
  }

  if (location.pathname == "/") changebackground("linear-gradient(to top, rgba(255,0,0,0), rgba(237,221,253))")
  else changebackground("none")


  if (header && navbar) {
    if (hideHeader) {
      header.style.display = "none"
      navbar.style.display = "none"
      return checkoutHeader(navigate)
    }
    else {
      header.style.display = ""
      navbar.style.display = ""
    }
  }

  return (null)
}


function checkoutHeader(navigate: NavigateFunction) {
  return (
    <div className="container mx-auto text-2xl py-4 text-purple-400 px-10">
      <p className="logo cursor-pointer" onClick={() => navigate("/")}>World Of Sweets</p>
    </div>
  )
}





function App() {


  return (
    <BrowserRouter>
      <HeaderWithLocation />
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chocolate" element={<Chocolate />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="biscuits" element={<Biscuits />} />
          <Route path="candies" element={<Candies />} />
          <Route path="cakes" element={<Cakes />} />
          <Route path="shopping_cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
      <ProductPage />
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App