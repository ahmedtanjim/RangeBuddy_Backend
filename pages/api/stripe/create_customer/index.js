const stripe = require("stripe")(process.env.STRIPE_API_SECRET)
const host = process.env.NEXT_PUBLIC_HOST
const appFee = process.env.STRIPE_APP_FEE

/**
 * Generates a checkout session based on the Connected Account Id and other
 * data provided. Handles cases for both the flutter app and the web.
 */
const createCustomer = async (req, res) => {
  const {
    email,
    name,
  } = req.query
  const customer = await stripe.customers.create(
    {
      name: name,
      email: email
    }
  )

  res.status(200).json({ customer })
}

export default createCustomer
