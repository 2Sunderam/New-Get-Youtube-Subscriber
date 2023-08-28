const request = require('supertest');
const app = require('./app');
const subscriberModel = require('./models/subscribers');


// Testing API ENDPOINTS of the api calls

describe('GET /subscribers', () => {
  it('should return an array of subscriber names', async () => {
    // Mocking data for the subscribers
    const mockSubscribers = [
      { name: 'John Doe' },
      { name: 'Jeread Krus' },
      { name: 'Lucifer' }
    ];

    // Mocking the subscriber model's find method
    jest.spyOn(subscriberModel, 'find').mockResolvedValue(mockSubscribers);

    // Making the request to the API endpoint
    const res = await request(app).get('/subscribers');

    // Assertions
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual(mockSubscribers.map(subscriber => subscriber.name));
  });

  it('should return a 500 error if there is a server error', async () => {
    // Mocking the subscriber model's find method to throw an error
    jest.spyOn(subscriberModel, 'find').mockRejectedValue(new Error('Mocked server error'));

    // Making the request to the API endpoint
    const res = await request(app).get('/subscribers');

    // Assertions
    expect(res.status).toEqual(500);
    expect(res.body).toEqual({ message: 'Mocked server error' });
  });
});





describe('GET /subscribers/names', () => {
  it('should return an array of subscriber names and subscribedChannel fields', async () => {
    // Mocking data for the response
    const mockSubscribers = [
      { name: 'John Doe', subscribedChannel: 'freeCodeCamp.org' },
      { name: 'Jeread Krus', subscribedChannel: 'CNET' },
      { name: 'Lucifer', subscribedChannel: 'Sentex' }
    ];

    // Mocking the API call to return the mock data
    jest.spyOn(subscriberModel, 'find').mockResolvedValue(mockSubscribers);

    // Making the request to the API endpoint
    const res = await request(app).get('/subscribers/names');

    // Asserting the response
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach(subscriber => {
      expect(subscriber).toHaveProperty('name');
      expect(subscriber).toHaveProperty('subscribedChannel');
      expect(typeof subscriber.name).toBe('string');
      expect(typeof subscriber.subscribedChannel).toBe('string');
    });
  });

  it('should return a 500 error if there is a server error', async () => {
    // Mocking the API call to simulate a server error
    jest.spyOn(subscriberModel, 'find').mockRejectedValue(new Error('Mocked server error'));

    // Making the request to the API endpoint
    const res = await request(app).get('/subscribers/names');

    // Asserting the response
    expect(res.status).toEqual(500);
    expect(res.body).toEqual({ message: 'Mocked server error' });
  });
});



describe('GET /subscribers/:id', () => {
  it('should return a subscriber if found', async () => {
    // Mocking data for the subscriber
    const mockSubscriber = {
      _id: '63624d2be6d7fd6bc57c8b8c',
      name: 'John Doe',
      subscribedChannel: 'freeCodeCamp.org',
      subscribedDate: '2022-11-02T10:57:47.501Z',
      __v: 0
    };

    // Mocking the subscriber model's findOne method
    jest.spyOn(subscriberModel, 'findOne').mockResolvedValue(mockSubscriber);

    // Making the request to the API endpoint
    const res = await request(app).get('/subscribers/John Doe'); 

    // Assertions
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(mockSubscriber);
  });

  it('should return a 400 error if subscriber is not found', async () => {
    // Mocking the subscriber model's findOne method to return null
    jest.spyOn(subscriberModel, 'findOne').mockResolvedValue(null);

    // Making the request to the API endpoint with a nonexistent subscriber as an ID
    const res = await request(app).get('/subscribers/NonExistentSubscriber'); 

    // Assertions
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'Subscriber not found' });
  });

  it('should return a 500 error if there is a server error', async () => {
    // Mocking the subscriber model's findOne method to throw an error
    jest.spyOn(subscriberModel, 'findOne').mockRejectedValue(new Error('Mocked server error'));

    // Making the request to the API endpoint
    const res = await request(app).get('/subscribers/SomeSubscriber'); 

    // Assertions
    expect(res.status).toEqual(500);
  });
});
