const { param } = require('express-validator');

const validateSubscriberArray = (req, res, next) => {
  // Getting the response data from res.locals
  const responseData = res.locals.responseData; 
  // Checking if responseData is not an array
  if (!Array.isArray(responseData)) {
      return res.status(400).json({ message: 'Response data is not an array' });
  }
 // Iterating through each name in the responseData array
  for (const name of responseData) {
      if (typeof name !== 'string' || name.trim() === '') {
          return res.status(400).json({ message: 'Invalid name in the response array' });
      }
  }
// If validation is successful the next middleware in the chain is called
  next();
};

const validateSubscriberDataArray = (req, res, next) => {
  // Getting the response data from res.locals
  const responseData = res.locals.responseData; 
  // Check if responseData is not an array
  if (!Array.isArray(responseData)) {
      return res.status(400).json({ message: 'Response data is not an array' });
  }

  for (const subscriber of responseData) 
    // Checking if the subscriber is not an object or if its properties are invalid
{
      if (
          typeof subscriber !== 'object' ||
          typeof subscriber.name !== 'string' || subscriber.name.trim() === '' ||
          typeof subscriber.subscribedChannel !== 'string' || subscriber.subscribedChannel.trim() === ''
      ) {
          return res.status(400).json({ message: 'Invalid subscriber data in the response array' });
      }
  }
// If validation is successful the next middleware in the chain is called
  next();
};

const validateSubscriberParams = () => [
// Validating the 'id' parameter
  param('id')
      .notEmpty().withMessage('Subscriber ID is required')
      .isLength({ min: 2 }).withMessage('Subscriber ID should be at least 2 characters long'),
// Validating the 'name' parameter
  param('name')
      .notEmpty().withMessage('Name is required'),
 // Validating the 'subscribedChannel' parameter
  param('subscribedChannel')
      .notEmpty().withMessage('Subscribed channel is required')
];


module.exports = {
  validateSubscriberArray,validateSubscriberDataArray,validateSubscriberParams 
};
