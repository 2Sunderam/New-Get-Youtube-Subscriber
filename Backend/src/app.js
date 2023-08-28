const mongoose = require('mongoose');
const express = require('express');
const app = express();
const subscriberModel = require('./models/subscribers');
const { validationResult } = require('express-validator');
const { validateSubscriberArray,validateSubscriberDataArray,validateSubscriberParams } = require('./validator');

const {options}= require('./Swagger');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const cors = require('cors')
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))




// your code goes here


// Serving static files from the "public" directory (e.g., CSS, images)
app.use(express.static('./src'));

// Route to render the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/subscribers', async (req, res) => {
    try {
     // Fetch all subscribers from the database, selecting only the 'name' field
        const subscribers = await subscriberModel.find({}, 'name -_id')
        // Extract the names from the fetched subscribers
        const names = subscribers.map(subscriber => subscriber.name)
        res.locals.responseData = names;
        res.json(names)
    } catch (error) {
        // Handle any errors that occur during the request
        res.status(500).json({ message: error.message })
    }
    
})

/**
 * @swagger
 * /subscribers:
 *   get:
 *     summary: Get all subscribers
 *     description: Fetches all subscribers from the database, selecting only the 'name' field.
 *     responses:
 *       200:
 *         description: Successful response with an array of subscriber names.
 *         content:
 *           application/json:
 *             example:
 *               - John Doe
 *               - Jane Smith
 *       500:
 *         description: Internal server error.
 */


app.get('/subscribers/names', async (req, res) => {
  try {
    // Fetch all subscribers from the database, selecting only the 'name' and 'subscribedChannel' fields
      const subscribers = await subscriberModel.find({}, 'name subscribedChannel -_id')
      res.locals.responseData = subscribers;
      res.json(subscribers)
  } catch (error) {
    // Handle any errors that occur during the request
      res.status(500).json({ message: error.message })
  }
})
/**
* @swagger
 * /subscribers/names:
 *   get:
 *     summary: Get names and subscribed channels of all subscribers
 *     description: Fetches all subscribers from the database, selecting only the 'name' and 'subscribedChannel' fields.
 *     responses:
 *       200:
 *         description: Successful response with an array of subscriber objects containing 'name' and 'subscribedChannel' fields.
 *         content:
 *           application/json:
 *             example:
 *               - name: John Doe
 *                 subscribedChannel: freeCodeCamp.org
 *               - name: Jane Smith
 *                 subscribedChannel: Coding Explained
 *       500:
 *         description: Internal server error.
 */


 app.get('/subscribers/:id', async (req, res) => {
  try {
    // Validating the request using the validation rules defined
      const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    
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

      const errors = validationResult(req);
   
  }
})

/**
 * @swagger
 * /subscribers/{id}:
 *   get:
 *     summary: Get a single subscriber by ID 
 *     description: Fetches a single subscriber from the database based on the provided ID parameter.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscriber ID
 *     responses:
 *       200:
 *         description: Successful response with the subscriber object.
 *       400:
 *         description: Subscriber not found or invalid request.
 *       500:
 *         description: Internal server error.
 */

// Using the validateSubscriberArray middleware for all routes under '/subscribers'
app.use('/subscribers', validateSubscriberArray);

// Using the validateSubscriberParams middleware for all routes under '/subscribers/:id'
app.use('/subscribers/:id',validateSubscriberParams);

// Using the validateSubscriberDataArray middleware for all routes under '/subscribers/names'
app.use('/subscribers/names', validateSubscriberDataArray);

// Generating Swagger documentation options using swaggerJsdoc
const specs = swaggerJsdoc(options);

// Serving and seting up of Swagger UI to display the API documentation
// The API documentation will be available at '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
