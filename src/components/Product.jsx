import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { StarIcon } from "@heroicons/react/24/solid"
import Currency from "react-currency-formatter"

const Product = ({ id, title, price, description, category, image, rating }) => {

    const [hasPrime] = useState(Math.random() < 0.5)

    const [rate, setRate] = useState(rating.rate)
    const [rate_, setRate_] = useState()

    useEffect(() => {
        handleRound()
      }, []);

    function handleRound() {
        const toNumber = parseFloat(rate)
        const roundedNumber = Math.round(toNumber);
        setRate_(roundedNumber - 1);
      }
  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
        <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>

        <Image 
            src={image} 
            height={200}
            width={200}
            alt={title}
            style={{objectFit:"contain"}} 
            className='m-auto'
        />

        <h4 className='my-3'>{title}</h4>

        <div className="flex">
            {Array(rate_)
                .fill()
                .map((_, i) => (
                    <StarIcon key={i} className='h-5 text-yellow-500' />
                ))
            
            }
            
        </div>
        
        <p className='text-xs my-2 line-clamp-2'>{description}</p>

        <div className="mb-4">
            <Currency quantity={price} currency='GBP'/>
        </div>

        {hasPrime && (
            <div className="flex items-center space-x-2">
                <img className='w-12' src='https://assets.stickpng.com/images/5f7f75fa3dd424000436e50e.png' alt='prime' />
                <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
            </div>
        )}

        <button className='mt-4 button'>Add to Basket</button>
    </div>
  )
}

export default Product