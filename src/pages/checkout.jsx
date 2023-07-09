import CheckoutProduct from '@/components/CheckoutProduct/index'
import Header from '@/components/Header/index'
import { selectItems, selectTotal } from '@/slices/basketSlice'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import Currency from 'react-currency-formatter'
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const stripePromise = loadStripe(
  `${process.env.stripe_public_key}`
)

const checkout = () => {

  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)
  const {data: session, status} = useSession()

  const createCheckoutSession = async () => {
    const stripe = await stripePromise

    console.log('Funciona')

    const CheckoutSession = await axios.post('/api/checkout_sessions', 
    {
      items: items,
      email: session.user.email
    })

    const result = await stripe.redirectToCheckout({
      sessionId: CheckoutSession.data.id
    })

    if(result.error) {
      alert(result.error.message)
    }
  }


  return (
    <div className='bg-gray-100 '>
      <Header />

      <main className='lg:flex max-w-screen-2xl mx-auto'>
    
        <div className="Left flex-grow m-5 shadow-sm">
          <Image 
            src='https://links.papareact.com/ikj'
            width={1020}
            height={250}
            style={{objectFit:"contain"}} 
            alt='Ad'
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className='text-3xl border-b pb-4'>
              {
                items.length === 0 
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"
              }
            </h1>

              {
                items.map((item, i) => (
                  <CheckoutProduct
                    key={i}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    description={item.description}
                    category={item.category}
                    image={item.image}
                    rate_={item.rate_}
                    hasPrime={item.hasPrime}
                  />
                ))
              }

          </div>
        </div>
      
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2>Subtotal ({items.length} items):{' '}
              <span className='font-bold'>
                <Currency quantity={total} currency='GBP'/>
              </span>
              </h2>

              <button 
                role='link'
                onClick={createCheckoutSession}
                disabled={
                  status === "authenticated"}
                className={`button mt-2 ${
                  status !== "authenticated"
                  ? "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                  : "cursor-pointer"
                }`}>
                {
                  status === "authenticated"
                  ? "Proceed to checkout"
                  : "Sign in to Checkout"
                }
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default checkout
