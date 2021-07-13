const express = require("express");
require('dotenv').config()
const app = express();
const port = process.env.PORT;
const stripe = require('stripe')(process.env.STRIPE_SECRET);

app.get("/", (req, res) => {
  res.send("Hello world");
})

/** Create a charge */
app.post('/charges',(req, res) => {
  const { amount, currency, source, description, customer } = req.body
  stripe.charges.create({
    amount: amount,
    currency:  currency,
    source: source,
    description: description,
    customer : customer
  })
  .then((response) => {
    return res.status(201).json(response)
  })
  .catch((err) => {
    return res.status(err.statusCode).json(err.raw.message)
  })
})

/** Retrieve a charge */
app.get('/charges', (req, res) => {
  const { id } = req.query;
  stripe.charges.retrieve(id)
  .then((response) => {
    return res.status(200).json(response)
  })
  .catch((err) => {
    return res.status(err.statusCode).json(err.raw.message)
  })
})

/** List all charges */
app.get("/charges", (req, res) => {
  const { customer } = req.body
  stripe.charges.list({
    customer: customer,
    limit: 3,
  })
  .then((response) => {
    return res.status(200).json(response)
  })
  .catch((err) => {
    return res.status(err.statusCode).json(err.raw.message)
  })
})

/** Create a customer */
app.post("/customers", (req, res) => {
  const { email, name, phone } = req.body
  stripe.customers.create({
    email: email,
    name: name,
    phone: phone
  })
  .then((response) => {
    return res.status(200).json(response)
  })
  .catch((err) => {
    return res.status(err.statusCode).json(err.raw.message)
  })
})

/** Retrieve a customer */
app.get("/customers", (req, res) => {
  const { customer } = req.query
  stripe.customers.retrieve(customer)
  .then((response) => {
    return res.status(200).json(response)
  })
  .catch((err) => {
    return res.status(err.statusCode).json(err.raw.message)
  })
})

/** Update a customer */
app.post("/customers", (req, res) => {
  const { customer, name, email, phone } = req.body
  stripe.customers
  .update(
    customer,
    name, 
    email,
    phone
  )
  .then((response) => {
    return res.status(200).json(response)
  })
  .catch((err) => {
    return res.status(err.statusCode).json(err.raw.message)
  })
})

/** Delete a customer */
app.delete("/customers", (req, res) => {
  const { customer } = req.query
  stripe.customers.del(customer)
  .then((response) => {
    return res.status(200).json(response)
  })
  .catch((err) => {
    return res.status(err.statusCode).json(err.raw.message)
  })
})

/** List all customers */
app.get("/customers", (req, res) => {
  stripe.customers.list()
  .then((response) => {
    return res.status(200).json(response)
  })
  .catch((err) => {
    return res.status(err.statusCode).json(err.raw.message)
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})