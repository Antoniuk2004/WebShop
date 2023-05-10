import PageFunc from "./PagesFunc"

enum ConfectioneryType {
  Chocolate = "Chocolate",
  Cookies = "Cookies",
  Biscuits = "Biscuits",
  Candies = "Candies",
  Cakes = "Cakes"
}

function Candies() {

  return (
    PageFunc(ConfectioneryType.Candies)
  )
}



export default Candies;