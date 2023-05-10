import PageFunc from "./PagesFunc"

enum ConfectioneryType {
  Chocolate = "Chocolate",
  Cookies = "Cookies",
  Biscuits = "Biscuits",
  Candies = "Candies",
  Cakes = "Cakes"
}

function Biscuits() {

  return (
    PageFunc(ConfectioneryType.Biscuits)
  )
}



export default Biscuits;