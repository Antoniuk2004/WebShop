import PageFunc from "./PagesFunc"

enum ConfectioneryType {
  Chocolate = "Chocolate",
  Cookies = "Cookies",
  Biscuits = "Biscuits",
  Candies = "Candies",
  Cakes = "Cakes"
}

function Cakes() {

  return (
    PageFunc(ConfectioneryType.Cakes)
  )
}



export default Cakes;