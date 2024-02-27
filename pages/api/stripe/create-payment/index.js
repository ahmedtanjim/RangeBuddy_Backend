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
  } = req.query
  const paymentIntent = await stripe.paymentIntents.create({
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
