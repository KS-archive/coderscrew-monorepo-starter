// eslint-disable-next-line unicorn/prevent-abbreviations
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { randomUUID } from 'crypto';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import { LOGIN_ENDPOINT, LoginBody } from '../src/modules/auth/controller/login.route';
import { LOGOUT_ENDPOINT } from '../src/modules/auth/controller/logout.route';
import { ME_ENDPOINT, MeResponse } from '../src/modules/auth/controller/me.route';
import { REGISTER_ENDPOINT, RegisterBody, RegisterResponse } from '../src/modules/auth/controller/register.route';

const createUserCredentials = (overwrite: Partial<LoginBody & RegisterBody> = {}): LoginBody & RegisterBody => ({
  email: `test-mail-${randomUUID()}@e2e.com`,
  password: randomUUID(),
  ...overwrite,
});

describe('Auth controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST auth/register', () => {
    it('returns a new account if correct credentials provided', async () => {
      const body: RegisterBody = createUserCredentials();
      const response = await request(app.getHttpServer()).post(REGISTER_ENDPOINT).send(body);

      const responseValidationErrors = await validate(plainToClass(RegisterResponse, response.body));

      expect(response.statusCode).toBe(201);
      expect(responseValidationErrors).toHaveLength(0);
    });

    it('returns error when no email provided', async () => {
      const body = createUserCredentials({ email: undefined });
      const response = await request(app.getHttpServer()).post(REGISTER_ENDPOINT).send(body);

      expect(response.statusCode).toBe(400);
      expect(response.body.statusCode).toBe(400);
      expect(response.body.error).toBe('Bad Request');
      expect(response.body.message).toEqual(['email must be an email']);
    });

    it('returns error when email has incorrect format', async () => {
      const body = createUserCredentials({ email: 'wrong@email' });
      const response = await request(app.getHttpServer()).post(REGISTER_ENDPOINT).send(body);

      expect(response.statusCode).toBe(400);
      expect(response.body.statusCode).toBe(400);
      expect(response.body.error).toBe('Bad Request');
      expect(response.body.message).toEqual(['email must be an email']);
    });

    it('returns error when user with a particular email already exist', async () => {
      const body = createUserCredentials();

      await request(app.getHttpServer()).post(REGISTER_ENDPOINT).send(body);

      const response = await request(app.getHttpServer()).post(REGISTER_ENDPOINT).send(body);

      expect(response.statusCode).toBe(409);
      expect(response.body.statusCode).toBe(409);
      expect(response.body.error).toBe('Conflict');
      expect(response.body.message).toBe('Duplicate e-mail address');
    });

    it('returns error when no password provided', async () => {
      const body = createUserCredentials({ password: undefined });
      const response = await request(app.getHttpServer()).post(REGISTER_ENDPOINT).send(body);

      expect(response.statusCode).toBe(400);
      expect(response.body.statusCode).toBe(400);
      expect(response.body.error).toBe('Bad Request');
      expect(response.body.message).toEqual(['password should not be empty']);
    });
  });

  describe('POST auth/login', () => {
    let userCredentials: RegisterBody & LoginBody;

    beforeAll(async () => {
      userCredentials = createUserCredentials();
      await request(app.getHttpServer()).post(REGISTER_ENDPOINT).send(userCredentials);
    });

    it('returns 204 status when user is successfully logged in', async () => {
      const response = await request(app.getHttpServer()).post(LOGIN_ENDPOINT).send(userCredentials);

      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });

    it('returns error when no email provided', async () => {
      const body = createUserCredentials({ email: undefined });
      const response = await request(app.getHttpServer()).post(LOGIN_ENDPOINT).send(body);

      expect(response.statusCode).toBe(401);
      expect(response.body.statusCode).toBe(401);
      expect(response.body.error).toBe('Unauthorized');
      expect(response.body.message).toBe('Incorrect e-mail address or password');
    });

    it('returns error when email has incorrect format', async () => {
      const body = createUserCredentials({ email: 'wrong@email' });
      const response = await request(app.getHttpServer()).post(LOGIN_ENDPOINT).send(body);

      expect(response.statusCode).toBe(401);
      expect(response.body.statusCode).toBe(401);
      expect(response.body.error).toBe('Unauthorized');
      expect(response.body.message).toEqual('Incorrect e-mail address or password');
    });

    it("returns error when user with provided email doesn't exist", async () => {
      const body = createUserCredentials({ password: userCredentials.password });

      const response = await request(app.getHttpServer()).post(LOGIN_ENDPOINT).send(body);

      expect(response.statusCode).toBe(401);
      expect(response.body.statusCode).toBe(401);
      expect(response.body.error).toBe('Unauthorized');
      expect(response.body.message).toBe('Incorrect e-mail address or password');
    });

    it('returns error when no password provided', async () => {
      const body = createUserCredentials({ password: userCredentials.password });
      const response = await request(app.getHttpServer()).post(LOGIN_ENDPOINT).send(body);

      expect(response.statusCode).toBe(401);
      expect(response.body.statusCode).toBe(401);
      expect(response.body.error).toBe('Unauthorized');
      expect(response.body.message).toEqual('Incorrect e-mail address or password');
    });

    it("returns error when user's password is incorrect", async () => {
      const body = createUserCredentials({ email: userCredentials.email });

      const response = await request(app.getHttpServer()).post(LOGIN_ENDPOINT).send(body);

      expect(response.statusCode).toBe(401);
      expect(response.body.statusCode).toBe(401);
      expect(response.body.error).toBe('Unauthorized');
      expect(response.body.message).toBe('Incorrect e-mail address or password');
    });
  });

  describe('GET auth/me', () => {
    it('returns the current user and 200 status when user is logged in', async () => {
      const userCredentials: RegisterBody & LoginBody = createUserCredentials();
      const agent = request.agent(app.getHttpServer());

      await agent.post(REGISTER_ENDPOINT).send(userCredentials);
      await agent.post(LOGIN_ENDPOINT).send(userCredentials);

      const response = await agent.get(ME_ENDPOINT);
      const responseValidationErrors = await validate(plainToClass(MeResponse, response.body));

      expect(response.statusCode).toBe(200);
      expect(responseValidationErrors).toHaveLength(0);
    });

    it('returns 204 status when user is not logged in', async () => {
      const response = await request(app.getHttpServer()).get(ME_ENDPOINT);

      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });
  });

  describe('POST auth/logout', () => {
    it('logs the current user out and returns 204', async () => {
      const userCredentials: RegisterBody & LoginBody = createUserCredentials();
      const agent = request.agent(app.getHttpServer());

      await agent.post(REGISTER_ENDPOINT).send(userCredentials);
      await agent.post(LOGIN_ENDPOINT).send(userCredentials);

      let meResponse = await agent.get(ME_ENDPOINT);

      expect(meResponse.statusCode).toBe(200);

      const logoutResponse = await agent.post(LOGOUT_ENDPOINT);

      meResponse = await agent.get(ME_ENDPOINT);

      expect(meResponse.statusCode).toBe(204);
      expect(logoutResponse.statusCode).toBe(204);
    });
  });
});
