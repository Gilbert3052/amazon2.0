import Header from '@/components/Header'
import React from 'react'
import { getSession, useSession } from 'next-auth/react'
import { moment } from 'moment'
import { db } from '../../firebase'
import { collection, doc, orderBy , query} from "@firebase/firestore"; 
import { useCollectionData } from 'react-firebase-hooks/firestore'

const orders = () => {

    const {data: session, status} = useSession()

    // const query = collection(db, `users/${session?.user.email}/orders`)

    // const [docs, loading, error] = useCollectionData(query)

    // console.log(docs);

  return (
    <div>
        <Header />
        <main className='max-w-screen-lg mx-auto p-10'>
            <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>
                Your Orders
            </h1>

            {
                status === "authenticated"
                ? (
                    <h2>x Orders</h2>
                )
                : (
                    <h2>Please Sign In to see your orders</h2>
                )
            }

            <div className="mt-5 space-y-4 ">

            </div>

        </main>
    </div>
  )
}

export default orders

// export async function getServerSideProps(context) {
//     const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//     const session = await getSession(context)

//     if(!session) {
//         return {
//             props: {}
//         }
//     }
//     // const stripeOrders = await db
//     //     .collection('users')
//     //     .doc(session.user.email)
//     //     .collection(db, 'orders')
//     //     .orderBy("timestamp", "desc")
//     //     .get()

//     const collection1 = collection(db, 'users')
//     const doc1 = doc(collection1, session.user.email)
//     const collection2 = collection(doc1, 'orders')
//     const doc2 = doc(collection2)
//     const orderBy1 = query(collection2, orderBy("timestamp", "desc"))
//     // const stripeOrders = get(orderBy1)




//     const orders = await Promise.all(
//         doc(collection2, map(async (order) => ({
//             id: order.id,
//             amount: order.data().amount,
//             amountShipping: order.data().amount_shipping,
//             images: order.data().images,
//             timestamp: moment(order.data().timestamp.toDate()).unix(),
//             items: (
//                 await stripe.checkout.sessions.lestLineItems(order.id, {
//                     limit: 100, 
//                 })
//             ).data,
//         })))
//     )

//     return {
//         props: {
//             orders,
//         }
//     }
// }