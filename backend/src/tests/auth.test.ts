import request from 'supertest';
import { app } from '../server.js';
import prisma from '../../prisma/PrismaClient.js';

describe('POST /auth/register', () => {
  beforeAll(async () => {
    // Set up any database state if necessary
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new user with valid inputs', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'TestPassword123',
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User created!');
  });

  it('should return an error for missing fields', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        password: 'TestPassword123',
      });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Error creating user');
  });
});
