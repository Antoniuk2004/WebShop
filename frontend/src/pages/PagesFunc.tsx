import { useState } from 'react';
import * as Data from "../data/Data";
import Breadcrumbs from "../data/Breadcrumbs";
import { Confectionery } from "../data/Confectionery";
import { Sort, SortProducts } from "../data/Sort"
import { SideBar } from "../data/Sidebar/SideBar"
import { ConfectioneryType } from "../data/DataTypes"
import { useLocation, useNavigate } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { data } from 'jquery';



var locationVar: any
var navigateVar: any

function OpenProductPage(name: string, navigate: any, location: any) {

    const newName = name.replaceAll(' ', '_').toLowerCase();
    const newPath = `${location.pathname}/${newName}`;
    navigate(newPath);

    return null;
}


function Page(type: ConfectioneryType) {
    var originalData: Array<Confectionery> = []
    switch (type) {
        case ConfectioneryType.Chocolate:
            originalData = Sort(Data.arrOfChocolates, 0)
            break
        case ConfectioneryType.Cookies:
            originalData = Sort(Data.arrOfCookies, 0)
            break
        case ConfectioneryType.Biscuits:
            originalData = Sort(Data.arrOfBuiscuits, 0)
            break
        case ConfectioneryType.Candies:
            originalData = Sort(Data.arrOfCandies, 0)
            break
        case ConfectioneryType.Cakes:
            originalData = Sort(Data.arrOfCakes, 0)
            break
    }

    var available: Boolean = true
    function CheckIfAvailable(numberOfAvailableItems: number) {
        if (numberOfAvailableItems === 0) {
            available = false
            return <span className='sold-out-text bg-stone-600 absolute px-5 left-3 top-3 text-white flex justify-center border-1 rounded-full py-2'>Sold Out</span>
        }
        else available = true
        return
    }


    function AddImage(image: string) {
        var imgClassName
        if (available) {
            imgClassName = "h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110"
        }
        else imgClassName = "h-full w-full"
        return <img
            className={imgClassName}
            src={image}
            alt="."
        />
    }

    function sortData(index: number) {
        setIndexOfSort(index)
        var newData = SortProducts(dataProp, index)
        setDataProp(newData)
    }

    function renderProducts() {
        return (
            dataProp.map((product, index) => (
                <button className="group relative" key={index} onClick={() => OpenProductPage(product.name, navigate, location)}>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-pink-100  xl:aspect-h-8 xl:aspect-w-7">
                        {CheckIfAvailable(product.numberOfAvailableItems)}
                        {AddImage(product.image)}
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700 h-10">{product.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
                </button>
            ))
        )
    }

    function handleDataChange(newData: Array<Confectionery>) {
        newData = SortProducts(newData, indexOfSort)
        setDataProp(newData);
    }

    function removeElement(index: any) {
        var newArrOfFilterTypes = arrOfFilterTypes
        newArrOfFilterTypes.splice(index, 1)
        var anotherNewArrOfFilterTypes: any = []
        newArrOfFilterTypes.forEach(element => {
            anotherNewArrOfFilterTypes.push(element)
        });
        setArrOfFilterTypes(anotherNewArrOfFilterTypes)
        return
    }

    function renderFilters() {
        return (
            <div className="flex items-center gap-x-2 content-start basis-5/6">
                <p>{dataProp.length}{dataProp.length === 1 ? ' product is selected' : ' products are selected'}</p>
                <div
                    onClick={() => setArrOfFilterTypes([])}
                    className="flex items-center px-4 py-1 gap-x-2 border-2 border-red-500 rounded-full cursor-pointer hover:bg-red-500 hover:bg-opacity-10">
                    <p>Cancel</p>
                </div>
                {arrOfFilterTypes.map((element, index) => (
                    <div
                        onClick={() => removeElement(index)}
                        className="flex items-center px-4 py-1 gap-x-2 border-2 rounded-full cursor-pointer hover:bg-red-500 hover:bg-opacity-10">
                        <p>{element[0]}</p>
                        <FontAwesomeIcon icon={faXmark} className='text-red-400' />
                    </div>
                ))}
            </div>
        )
    }


    const location = useLocation()
    const navigate = useNavigate()
    const [dataProp, setDataProp] = useState(originalData)
    const [arrOfFilterTypes, setArrOfFilterTypes] = useState([])
    const [indexOfSort, setIndexOfSort] = useState(0)

    return (
        <div className='body'>
            <div className="grid-cols-1 container mx-auto ">
                <Breadcrumbs location={location} />
                <h1 className="mb-6  text-3xl text-black">{type}</h1 >
                <div className="sort py-8 flex justify-end">
                    {arrOfFilterTypes.length !== 0 ? renderFilters() : null}
                    <select className="select basis-1/6 focus:ring-purple-500  focus:border-purple-500 ">
                        <option value="best-selling" onClick={() => sortData(0)}>Best Selling</option>
                        <option value="A-Z" onClick={() => sortData(1)}>Title, A-Z</option>
                        <option value="Z-A" onClick={() => sortData(2)}>Title, Z-A</option>
                        <option value="low-to-high" onClick={() => sortData(3)}>Price, low to high</option>
                        <option value="high-to-low" onClick={() => sortData(4)}>Price, higth to low</option>
                    </select>
                </div>
                <div className="catalog container mx-auto flex flex-row gap-7">
                    {SideBar(
                        { data: dataProp, set: handleDataChange },
                        { data: arrOfFilterTypes, set: setArrOfFilterTypes },
                        originalData
                    )}

                    <div className="products grid grid-col-5 basis-5/6">
                        <div className="2xl:max-w-2sm sm:max-w-s">
                            <div id="products-content" className="products-content grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 gap-x-6 gap-y-10">
                                {renderProducts()}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export { Page, OpenProductPage, locationVar, navigateVar };