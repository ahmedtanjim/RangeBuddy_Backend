const stripe = require("stripe")(process.env.STRIPE_API_SECRET)
const host = process.env.NEXT_PUBLIC_HOST
const appFee = process.env.STRIPE_APP_FEE

/**
 * Generates a checkout session based on the Connected Account Id and other
 * data provided. Handles cases for both the flutter app and the web.
 */
const createPayment = async (req, res) => {
  const {
    amount,
    instructor_id,
    name,
    email,
  } = req.query
  const createCustomer = await stripe.customers.create(
    {
      name: name,
      email: email
    },{
    stripeAccount: instructor_id
  }
  )
  const token = await stripe.tokens.create(
    {
      customer: createCustomer.id,
    },
    {
      stripeAccount: instructor_id,
    },
  )
  const customer = await stripe.customers.create(
    {
      source: token.id,
    },
    {
      stripeAccount: instructor_id,
    },
  )
  const paymentIntent = await stripe.payment_intent.create({
    customer: customer.id,
    amount: amount,
    currency: "usd",
    application_fee_percent: 10,
  }, {
    stripeAccount: instructor_id,
  })

  res.status(200).json({
    id: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
  })
}

export default createPayment
