import Header from '@/components/Header/index'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useRouter } from 'next/router'

const Success = () => {

    const router = useRouter()

  return (
    <div className='bg-gray-100 h-screen'>
        <Header />

        <main className='max-v-screen-lg  mx-auto'>
            <div className="flex flex-col p-10 bg-white">
                <div className="flex items-center space-x-2 mb-5">
                    <CheckCircleIcon className='text-green-500 h-10' />
                    <h1 className='text-3xl'>
                        Thank you, your order has been confirmed!
                    </h1>
                </div>
                <p>
                    Thank for your shipping with us. We'll send a confirmation once your item has shipped, if you would like to check the status of your order(s) please press the link below.
                </p>
                <button 
                    onClick={() => router.push('/orders')} 
                    className='button mt-8'>Go to my orders</button>
            </div>
        </main>
    </div>
  )
}

export default Success


// const express = require('express');
// const app = express();

// // Set your secret key. Remember to switch to your live secret key in production.
// // See your keys here: https://dashboard.stripe.com/apikeys
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// app.get('/order/success', async (req, res) => {
//   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
//   const customer = await stripe.customers.retrieve(session.customer);

//   res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
// });

// app.listen(4242, () => console.log(`Listening on port ${4242}!`));