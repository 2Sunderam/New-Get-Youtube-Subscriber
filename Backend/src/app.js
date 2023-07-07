const mongoose = require('mongoose');
const express = require('express')
const app = express()
const subscriberModel = require('./models/subscribers')

const cors = require('cors')
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))


// your code goes here
app.get('/subscribers/names', async (req, res) => {
    try {
     // Fetch all subscribers from the database, selecting only the 'name' field
        const subscribers = await subscriberModel.find({}, 'name -_id')
        // Extract the names from the fetched subscribers
        const names = subscribers.map(subscriber => subscriber.name)
        res.json(names)
    } catch (error) {
        // Handle any errors that occur during the request
        res.status(500).json({ message: error.message })
    }
})




app.get('/subscribers', async (req, res) => {
  try {
    // Fetch all subscribers from the database, selecting only the 'name' and 'subscribedChannel' fields
      const subscribers = await subscriberModel.find({}, 'name subscribedChannel -_id')
      res.json(subscribers)
  } catch (error) {
    // Handle any errors that occur during the request
      res.status(500).json({ message: error.message })
  }
})



 app.get('/subscribers/:id', async (req, res) => {
  try {
    // Find a single subscriber in the database based on the provided name parameter
      const subscriber = await subscriberModel.findOne({ name: req.params.id })
      // Check if the subscriber is not found
      if (!subscriber) {
        //Return a 400 status code and an error message as JSON if the subscriber is not found
          return res.status(400).json({ message: 'Subscriber not found' })
      }
      res.json(subscriber)
  } catch (error) {
    // Handle any errors that occur during the request
      res.status(500).json({ message: error.message })
  }
})


 
module.exports = app;
