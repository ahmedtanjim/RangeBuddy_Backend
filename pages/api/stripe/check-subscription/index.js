const stripe = require("stripe")(process.env.STRIPE_API_SECRET)
const host = process.env.NEXT_PUBLIC_HOST
const appFee = process.env.STRIPE_APP_FEE

/**
 * Generates a checkout session based on the Connected Account Id and other
 * data provided. Handles cases for both the flutter app and the web.
 */
const createSubscription = async (req, res) => {
  const {
    subscription_id,
  } = req.query
  const subscription = await stripe.subscriptions.retrieve(subscription_id)

  res.status(200).json({
    id: subscription.id,
    status: subscription.status,
  })
}

export default createSubscription
