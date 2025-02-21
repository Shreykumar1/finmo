import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateParkingDto } from './../src/parking/dto/create-parking.dto';
import { AllocateParkingDto } from './../src/parking/dto/allocate-parking.dto';
import { ClearParkingDto } from './../src/parking/dto/clear-parking.dto';
import { ExpandParkingDto } from './../src/parking/dto/expand-parking.dto';

describe('ParkingController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/parking_lot (POST) - should initialize parking lot', () => {
    const dto: CreateParkingDto = { no_of_slot: 5 };
    return request(app.getHttpServer())
      .post('/parking_lot')
      .send(dto)
      .expect(201)
      .expect({ total_slot: 5 });
  });

  it('/park (POST) - should allocate parking slot', async () => {
    const createDto: CreateParkingDto = { no_of_slot: 5 };
    await request(app.getHttpServer()).post('/parking_lot').send(createDto);

    const allocateDto: AllocateParkingDto = { car_reg_no: 'KA-01-AB-2211', car_color: 'Red' };
    return request(app.getHttpServer())
      .post('/park')
      .send(allocateDto)
      .expect(201)
      .expect({ allocated_slot_number: 1 });
  });

  it('/clear (POST) - should clear parking slot', async () => {
    const createDto: CreateParkingDto = { no_of_slot: 5 };
    await request(app.getHttpServer()).post('/parking_lot').send(createDto);

    const allocateDto: AllocateParkingDto = { car_reg_no: 'KA-01-HH-1234', car_color: 'Red' };
    await request(app.getHttpServer()).post('/park').send(allocateDto);

    const clearDto: ClearParkingDto = { slot_number: 1 };
    return request(app.getHttpServer())
      .post('/clear')
      .send(clearDto)
      .expect(200)
      .expect({ freed_slot_number: 1 });
  });

  it('/parking_lot (PATCH) - should expand parking lot', async () => {
    const createDto: CreateParkingDto = { no_of_slot: 5 };
    await request(app.getHttpServer()).post('/parking_lot').send(createDto);

    const expandDto: ExpandParkingDto = { increment_slot: 5 };
    return request(app.getHttpServer())
      .patch('/parking_lot')
      .send(expandDto)
      .expect(200)
      .expect({ total_slot: 10 });
  });

  it('/status (GET) - should return occupied slots', async () => {
    const createDto: CreateParkingDto = { no_of_slot: 5 };
    await request(app.getHttpServer()).post('/parking_lot').send(createDto);

    const allocateDto: AllocateParkingDto = { car_reg_no: 'KA-01-HH-1234', car_color: 'Red' };
    await request(app.getHttpServer()).post('/park').send(allocateDto);

    return request(app.getHttpServer())
      .get('/status')
      .expect(200)
      .expect([{ slot_no: 1, registration_no: 'KA-01-HH-1234', color: 'Red' }]);
  });

  it('/registration_numbers/:color (GET) - should return cars by color', async () => {
    const createDto: CreateParkingDto = { no_of_slot: 5 };
    await request(app.getHttpServer()).post('/parking_lot').send(createDto);

    const allocateDto: AllocateParkingDto = { car_reg_no: 'KA-01-HH-1234', car_color: 'Red' };
    await request(app.getHttpServer()).post('/park').send(allocateDto);

    return request(app.getHttpServer())
      .get('/registration_numbers/Red')
      .expect(200)
      .expect(['KA-01-HH-1234']);
  });

  it('/slot_numbers/:color (GET) - should return slot numbers by color', async () => {
    const createDto: CreateParkingDto = { no_of_slot: 5 };
    await request(app.getHttpServer()).post('/parking_lot').send(createDto);

    const allocateDto: AllocateParkingDto = { car_reg_no: 'KA-01-HH-1234', car_color: 'Red' };
    await request(app.getHttpServer()).post('/park').send(allocateDto);

    const response = await request(app.getHttpServer())
        .get('/slot_numbers/Red')
        .expect(200);

    console.log('Response:', response.body);
    expect(response.body).toEqual([1]);
  });

  it('/slot/:regNo (GET) - should return slot number by registration number', async () => {
    const createDto: CreateParkingDto = { no_of_slot: 5 };
    await request(app.getHttpServer()).post('/parking_lot').send(createDto);

    const allocateDto: AllocateParkingDto = { car_reg_no: 'KA-01-HH-1234', car_color: 'Red' };
    await request(app.getHttpServer()).post('/park').send(allocateDto);

    return request(app.getHttpServer())
      .get('/slot/KA-01-HH-1234')
      .expect(200)
      .expect({ slot_number: 1 });
  });
}); 