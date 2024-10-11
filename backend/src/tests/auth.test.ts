import request, { SuperTest, Test } from 'supertest';
import prisma from '../../prisma/PrismaClient';
import { app } from '../server';

describe('POST /auth/register', () => {
  let agent: SuperTest<Test>;

  beforeAll(async () => {
    agent = request(app);

    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new user with valid inputs', async () => {
    const res = await agent
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'TestPassword123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User created!');
  });

  it('should return an error for missing fields', async () => {
    const res = await agent
      .post('/auth/register')
      .send({
        username: 'testuser',
        password: 'TestPassword123',
      });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Error creating user');
  });

  it('should return an error for duplicate users', async () => {
    await prisma.user.create({
      data: {
        email: 'duplicate@example.com',
        username: 'duplicateuser',
        password: 'DuplicatePassword123',
      },
    });

    const res = await agent
      .post('/auth/register')
      .send({
        email: 'duplicate@example.com',
        username: 'duplicateuser',
        password: 'DuplicatePassword123',
      });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'User already exists');
  });
});
