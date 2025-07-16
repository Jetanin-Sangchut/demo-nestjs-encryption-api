import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

interface EncryptResponse {
  successful: boolean;
  error_code: string;
  data: {
    data1: string;
    data2: string;
  };
}

interface DecryptResponse {
  successful: boolean;
  error_code: string;
  data: {
    payload: string;
  };
}

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('EncryptController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/get-encrypt-data (POST) should return encrypted data1 and data2', async () => {
    const payload = 'Secret Message!';

    const response = await request(app.getHttpServer())
      .post('/api/get-encrypt-data')
      .send({ payload })
      .expect(201);

    const body = response.body as EncryptResponse;

    expect(body.successful).toBe(true);
    expect(body.data).toHaveProperty('data1');
    expect(body.data).toHaveProperty('data2');
    expect(typeof body.data.data1).toBe('string');
    expect(typeof body.data.data2).toBe('string');
  });

  it('/api/get-decrypt-data (POST) should return original payload', async () => {
    const payload = 'Hello secret world!';

    const response = await request(app.getHttpServer())
      .post('/api/get-encrypt-data')
      .send({ payload })
      .expect(201);
    const encryptBody = response.body as EncryptResponse;

    const decryptRes = await request(app.getHttpServer())
      .post('/api/get-decrypt-data')
      .send({ data1: encryptBody.data.data1, data2: encryptBody.data.data2 })
      .expect(201);
    const decryptBody = decryptRes.body as DecryptResponse;

    expect(decryptBody.successful).toBe(true);
    expect(decryptBody.data).toHaveProperty('payload');
    expect(decryptBody.data.payload).toBe(payload);
    expect(typeof decryptBody.data.payload).toBe('string');
  });
});
