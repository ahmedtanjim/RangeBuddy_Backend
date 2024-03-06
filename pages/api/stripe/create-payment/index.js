const stripe = require("stripe")(process.env.STRIPE_API_SECRET)

/**
 * Generates a checkout session based on the Connected Account ID and other
 * data provided. Handles cases for both the flutter app and the web.
 */
const createPayment = async (req, res) => {
  const {
    amount,
    customer_id,
    instructor_id,
  } = req.query
  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer_id,
    amount: amount,
    currency: "usd",
    application_fee_amount: Math.floor(amount * 0.10),
    transfer_data: {
      destination: instructor_id,
    },
  }, )

  res.status(200).json({
    id: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
  })
}

export default createPayment
