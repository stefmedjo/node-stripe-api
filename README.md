# Node Stripe API
Node Stripe API is a payment api implemented using Node and Stripe.
You can use it to manage all the stripe processes in your application.

# Requirements
* Node v14.6.1

# Getting started
First, you have to clone the repository.
```bash
  git clone https:\\ <project-name>
```
Secondly, install all dependencies.
```bash
  npm install
```
This will install [Stripe](https://stripe.com/) dependency.
You will have to rename .env.production to .env and provide
the public and secret keys of your stripe account.

# Endpoints
There are several endpoints to :
* Create a customer : POST /customers
* Update a customer : POST /customers/:id
* Retrieve a customer : GET /customers/:id
* Delete a customer : DELETE /customers/:id
* List all customers: GET /customers
