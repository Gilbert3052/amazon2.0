import { buffer } from "micro"
import * as admin from 'firebase-admin'
import getRawBody from 'raw-body'

const serviceAccount = require('../../../permissions.json')

const app = !admin.apps.length 
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
        }) 
    : admin.app() 


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = `${process.env.STRIPE_SIGNIN_SECRET}`

const fulfillOrder = async (session) => {


    return app
        .firestore()
        .collection('users')
        .doc(session.metadata.email)
        .collection('orders').doc(session.id).set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping /100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log(`Success: Order ${session.id} had been added to the DB`);
        })
}

export default async function handler(req, res){
    if (req.method === 'POST') {
        // const requestBuffer = await buffer(req)
        const rawBody = await getRawBody(req)
        const sig = req.headers['stripe-signature']

        let event

        try {
            event = stripe.webhooks.constructEvent(rawBody.toString(), sig, endpointSecret)
        } catch (err) { 
            console.log('Error', err.message);
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        if(event.type === 'checkout.session.completed') {
            const session = event.data.object

            return fulfillOrder(session)
                .then(() => res.status(200).send(""))
                .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`))
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    }
}