import { addToBasket, removeFromBasket } from '@/slices/basketSlice'
import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Currency from "react-currency-formatter"
import { useDispatch } from 'react-redux'

const CheckoutProduct = ({ id, title, price, description, category, image, rate_, hasPrime }) => {

    const dispatch = useDispatch()

    const addItemToBasket = () => {
        const product = {
            id, 
            title, 
            price, 
            description, 
            category, 
            image,
            rate_,
            hasPrime,
        }

        dispatch(addToBasket(product))
    }

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({id}))
    }


  return (
    <div className='grid grid-cols-5'>
        <Image 
            src={image}
            width={200}
            height={200}
            style={{objectFit:"contain"}}
            alt={title}
        />

        <div className="col-span-3 mx-5">
            <p>{title}</p>
            <div className="flex">
                {Array(rate_)
                    .fill()
                    .map((_, i) => (
                        <StarIcon key={i} className='h-5 text-yellow-500' />
                    ))
                }
            </div>

            <p className="text-xs my-2 line-clamp-3">
                {description}
            </p>
            <Currency quantity={price} currency='GBP'/>
            {hasPrime && (
                <div className="flex items-center space-x-2">
                    <img className='w-12' src='https://www.logo.wine/a/logo/Amazon_Prime/Amazon_Prime-Logo.wine.svg' alt='prime' />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )}
        </div>

        <div className="flex flex-col space-y-2 my-auto justify-self-end">
            <button onClick={addItemToBasket} className='button'>Add to Basket</button>
            <button onClick={removeItemFromBasket} className='button'>Remove from Basket</button>
        </div>
        

    </div>
  )
}

export default CheckoutProduct