import React from 'react';
import Carousel from '../data/Carousel';
import { useLocation } from 'react-router';

function Home() {
    const images = [
        "/images/slide1.png",
        "/images/slide2.png",
        "/images/slide3.png",
    ]

    
    return (
        <div className='py-36'>
            <Carousel images={images} />
        </div>
    )
}

export default Home;