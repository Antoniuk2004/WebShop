import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';


interface CarouselProps {
  images: string[];
}


function Carousel({ images }: CarouselProps) {

  const [index, setIndex] = useState(0)
  const [img, useImg] = useState(images[index])

  function SetPrevImage() {
    var prev: number = Number(index - 1)
    if (prev < 0)
      prev = images.length - 1
    setIndex(prev)
    useImg(images[prev])
  }

  function SetNextImage() {
    var next: number = Number(index + 1)
    if (next > images.length - 1)
      next = 0
    setIndex(next)
    useImg(images[next])
  }


  function ChangeImage(currentIndex: number) {

    setIndex(currentIndex)
    useImg(images[currentIndex])
  }

  return (
    <div className='carousel container mx-auto drop-shadow-xl relative 2xl:w-7/12 xl:w-6/12'>
      <img className="fit-picture rounded-xl pointer-events-none " src={img} alt="."></img>
      <div className='flex py-3'>
        <button className="basis-1/3 flex justify-start">
          <FontAwesomeIcon
            className='h-10 opacity-30'
            onClick={SetPrevImage}
            icon={faCircleChevronLeft} />
        </button>
        <div className='dots basis-1/3 flex justify-center items-center gap-5'>
          {images.map((element, currentIndex) => (
            <div
              onClick={() => ChangeImage(currentIndex)}
              className={`cursor-pointer h-4 w-4 border-black rounded-full bg-black opacity-30 ${(index == currentIndex) ? 'bg-purple-400 opacity-100' : ''}`}>
            </div>
          ))}
        </div>
        <button className="basis-1/3 flex justify-end">
          <FontAwesomeIcon
            className='h-10 opacity-30 pointer'
            onClick={SetNextImage}
            icon={faCircleChevronRight} />
        </button>
      </div>
    </div>
  )
}

export default Carousel