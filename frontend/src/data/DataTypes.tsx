import { Confectionery } from "./Confectionery";
import { Order } from "./Order";

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

enum Arrow {
    Up,
    Down,
    None
}

enum StockType {
    In,
    Out,
}

enum MathSign {
    Plus,
    Minus
}

interface Props {
    dataProp: any
    onDataChange: (data: any) => void
}

export { ConfectioneryType, DropDownType, FilterType, StockType, MathSign, Arrow };
export type { Props };
