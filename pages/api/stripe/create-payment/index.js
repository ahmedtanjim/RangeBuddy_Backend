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
    customer_id,
    instructor_id,
  } = req.query
  const paymentIntent = await stripe.payment_intent.create({
    customer: customer_id,
    amount: amount,
    currency: "usd",
    payment_method: "card",
    application_fee_amount: amount * 0.10,
  }, {
    stripeAccount: instructor_id,
  })

  res.status(200).json({
    id: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
  })
}

export default createPayment
