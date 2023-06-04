import { Confectionery } from "./Confectionery";

enum ConfectioneryType {
    Chocolate = "Chocolate",
    Cookies = "Cookies",
    Biscuits = "Biscuits",
    Candies = "Candies",
    Cakes = "Cakes"
}

enum DropDownType {
    normal,
    price
}

enum FilterType {
    Brand,
    Country,
    Quantity,
    Weigth,
    Availability
}

enum StockType {
    In,
    Out,
}

enum MathSign{
    Plus,
    Minus
}


interface Props {
    dataProp: Array<Confectionery>
    onDataChange: (data: Array<Confectionery>) => void
}

export { ConfectioneryType, DropDownType, FilterType, StockType, MathSign };
export type { Props  };
