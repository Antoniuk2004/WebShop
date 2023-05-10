import PageFunc from "./PagesFunc"

enum ConfectioneryType {
  Chocolate = "Chocolate",
  Cookies = "Cookies",
  Biscuits = "Biscuits",
  Candies = "Candies",
  Cakes = "Cakes"
}

function Cookies() {

  return (
    PageFunc(ConfectioneryType.Cookies)
  )
}



export default Cookies;