const request = require('supertest');
const app = require('./app');

describe('GET /subscribers/names', () => {
  it('should return an array of subscriber names', async () => {
    const res = await request(app).get('/subscribers/names');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return a 500 error if there is a server error', async () => {
    const res = await request(app).get('/subscribers/names');

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({ message: 'error message' });
  });
});
console.log(describe);