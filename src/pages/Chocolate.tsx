import PageFunc from "./PagesFunc"

enum ConfectioneryType {
  Chocolate = "Chocolate",
  Cookies = "Cookies",
  Biscuits = "Biscuits",
  Candies = "Candies",
  Cakes = "Cakes"
}

function Chocolate() {

  return (
    PageFunc(ConfectioneryType.Chocolate)
  )
}



export default Chocolate;