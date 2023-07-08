const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body

  const transformedItems = items.map(item => ({
    // description: item.description,
    quantity: 1,
    price_data: {
      currency: 'usd',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image]
      },
    }
  }))

  const session = await stripe.checkout.sessions.create({
    // shipping_rates: ['shr_1NRFj9CCe3nDtlIo7kqfKoo2'],
    // shipping_address_collection: {
    //   allow_countries: ['GB', 'US', "CA"]
    // },
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map(item => item.image))
    }
  })

  res.status(200).json({ id: session.id })
}




