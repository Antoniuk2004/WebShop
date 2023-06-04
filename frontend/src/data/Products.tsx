import { Confectionery } from "../data/Confectionery";
import { Sort } from "./Sort"
import { useNavigate, useLocation, NavigateFunction } from 'react-router-dom';
import {OpenProductPage, locationVar, navigateVar} from "../pages/PagesFunc"

var currentType = 0


function SortProducts(currentData: Array<Confectionery>, indexOfSort: number) {
    currentType = indexOfSort
    currentData = Sort(currentData, indexOfSort)
    
    return currentData
}



export { SortProducts, currentType }