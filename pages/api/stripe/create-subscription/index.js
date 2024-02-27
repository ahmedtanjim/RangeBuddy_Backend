const stripe = require("stripe")(process.env.STRIPE_API_SECRET)
const host = process.env.NEXT_PUBLIC_HOST
const appFee = process.env.STRIPE_APP_FEE

/**
 * Generates a checkout session based on the Connected Account Id and other
 * data provided. Handles cases for both the flutter app and the web.
 */
const createSubscription = async (req, res) => {
  const {
    amount,
    price_id,
    customer_id,
    instructor_id,
  } = req.query
  const subscription = await stripe.subscriptions.create({
    customer: customer_id,
    items: [{
      price: price_id,
    }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
    application_fee_percent: 10,
    }, {
      stripeAccount: instructor_id,
    }
  );

  res.status(200).json({ id: subscription.id,
    clientSecret: subscription.latest_invoice.payment_intent.client_secret })
}

export default createSubscription
