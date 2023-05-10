import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Chocolate from "./pages/Chocolate";
import Cookies from "./pages/Cookies";
import Biscuits from "./pages/Biscuits";
import Candies from "./pages/Candies";
import Cakes from "./pages/Cakes";
import "./css/App.css";


enum ConfectioneryType {
  Chocolate = "Chocolate",
  Cookies = "Cookies",
  Biscuits = "Biscuits",
  Candies = "Candies",
  Cakes = "Cakes"
}



export default function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="chocolate" element={<Chocolate />} />
              <Route path="cookies" element={<Cookies />} />
              <Route path="biscuits" element={<Biscuits />} />
              <Route path="Candies" element={<Candies />} />
              <Route path="Cakes" element={<Cakes />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      <div className="footer container mx-auto text-sm absolute inset-x-0 bottom-0">
        <div className="flex-grow border-t border-black" ></div>
        <div className="content grid grid-cols-2 py-3 ">
          <div className="left-side col-start-1 col-end-2">
            <a className="">© {new Date().getFullYear()} World Of Sweets™</a>
          </div>
          <div className="right-side col-start-3 flex grid-cols-3 gap-4">
            <a href="#">About</a>
            <a href="#">Licensing</a>
            <a href="#">Contact</a>
          </div>

        </div>



      </div>

    </div>

  );
}

ReactDOM.render(<App />, document.getElementById("root"));