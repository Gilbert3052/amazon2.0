import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/outline"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectItems } from '@/slices/basketSlice'

const Header = () => {

    const {data: session, status} = useSession()
    const [userName, setUserName] = useState("Hello Guest")
    const router = useRouter()
    const items = useSelector(selectItems)


    useEffect(() => {
        if (status === "authenticated") {
            setUserName(`hello, ${session.user.name}`)
          } else {
            setUserName("Hello Guest")
          }
    }, [status])
    
    
    

  return (
    <header> 
        
        <div className="flex items-center bg-amazon_blue flex-grow p-2 ">
            
            <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                <Image 
                    onClick={() => router.push('/')}
                    src="https://links.papareact.com/f90"
                    width={150}
                    height={40}
                    alt='Amazon Logo'
                    style={{objectFit:"contain"}}
                    className='cursor-pointer object-contain mx-3'
                />
            </div>

            <div className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer  sm:flex items-center h-10 rounded-md flex-grow xs:visibility: hidden" >
                <input type="text" className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4'/>
                <MagnifyingGlassIcon className='h-12 p-4'/>
            </div>

            <div className="text-white flex items-center text-xs space-x-6 ms-6 whitespace-nowrap">
                <div onClick={status !== "authenticated" ? signIn : signOut} className="link">
                    <p className='hover:underline'>
                        {userName}
                    </p>
                    <p className='font-extrabold md:text-sm'>Account & List</p>
                </div>
                <div onClick={() => router.push('/orders')} className="link ">
                    <p>Returns</p>
                    <p className='font-extrabold md:text-sm'>& Orders</p>
                </div>
                <div onClick={() => router.push('/checkout')} className="relative link flex items-center">
                    <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-500 text-center rounded-full text-black'>{items.length}</span>

                    <ShoppingBagIcon className='h-10'/>
                    <p className='hidden md:inline font-extrabold md:text-sm'>Basket</p>
                </div>
            </div>
        </div>

        <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
            <p className='link flex items-center'>
                <Bars3Icon className='h-6 mr1'/>
                All
            </p>
            <p className="link">Prime Video</p>
            <p className="link">Amazon Business</p>
            <p className="link">Today's Deals</p>
            <p className='link hidden lg:inline-flex'>Electronics</p>
            <p className='link hidden lg:inline-flex'>Food & Grocery</p>
            <p className='link hidden lg:inline-flex'>Prime</p>
            <p className='link hidden lg:inline-flex'>Buy again</p>
            <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
            <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
        </div>

    </header>
  )
}

export default Header