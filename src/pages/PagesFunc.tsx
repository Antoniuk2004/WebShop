import React from 'react';
import * as Data from "../data/Data";
import { Breadcrumbs } from "@material-tailwind/react";
import {Confectionery} from "../data/Confectionery";
import { Sort } from "../data/Sort"
import { SideBar } from "../data/SideBar"
import { ConfectioneryType } from "../data/Enums"
import { SortProducts } from '../data/Products';
import { useLocation, useNavigate } from 'react-router-dom';


var locationVar: any
var navigateVar: any

function OpenProductPage(name: string, navigate: any, location: any) {

    const newName = name.replaceAll(' ', '_').toLowerCase();
    const newPath = `${location.pathname}/${newName}`;
    navigate(newPath);

    return null;
}


function Page(type: ConfectioneryType) {
    locationVar = useLocation();
    navigateVar = useNavigate()

    var currentData: Array<Confectionery> = []
    switch (type) {
        case ConfectioneryType.Chocolate:
            currentData = Sort(Data.arrOfChocolates, 0)
            break
        case ConfectioneryType.Cookies:
            currentData = Sort(Data.arrOfCookies, 0)
            break
        case ConfectioneryType.Biscuits:
            currentData = Sort(Data.arrOfBuiscuits, 0)
            break
        case ConfectioneryType.Candies:
            currentData = Sort(Data.arrOfCandies, 0)
            break
        case ConfectioneryType.Cakes:
            currentData = Sort(Data.arrOfCakes, 0)
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
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="body grid-cols-1 container mx-auto">
            <Breadcrumbs className='pb-6'>
                <a href="/" className="text-xl pr-2 opacity-60">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                </a>
                <a className='text-xl pl-2' href="#">{type}</a>
            </Breadcrumbs>
            <h1 className="mb-6  text-3xl text-black">{type}</h1 >
            <div className="sort py-8 flex flex-row ">
                <div className="basis-5/6">Settings</div>
                <select className="select basis-1/6 ">
                    <option value="best-selling" onClick={() => SortProducts(currentData, 0)}>Best Selling</option>
                    <option value="A-Z" onClick={() => SortProducts(currentData, 1)}>Title, A-Z</option>
                    <option value="Z-A" onClick={() => SortProducts(currentData, 2)}>Title, Z-A</option>
                    <option value="low-to-high" onClick={() => SortProducts(currentData, 3)}>Price, low to high</option>
                    <option value="high-to-low" onClick={() => SortProducts(currentData, 4)}>Price, higth to low</option>
                </select>
            </div>
            <div className="catalog container mx-auto flex flex-row gap-7">
                {SideBar(currentData)}
                <div className="products grid grid-col-5 basis-5/6">
                    <div className="2xl:max-w-2sm sm:max-w-s">
                        <div id="products-content" className="products-content grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 gap-x-6 gap-y-10">
                            {currentData.map((product) => (
                                <button className="group relative" onClick={() => OpenProductPage(product.name, navigate, location)}>
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-pink-100  xl:aspect-h-8 xl:aspect-w-7">
                                        {CheckIfAvailable(product.numberOfAvailableItems)}
                                        {AddImage(product.image)}
                                    </div>
                                    <h3 className="mt-4 text-sm text-gray-700 h-10">{product.name}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export { Page, OpenProductPage, locationVar, navigateVar };