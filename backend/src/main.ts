import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import express from 'express';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  const httpAdapter = app.getHttpAdapter().getInstance();

  httpAdapter.set(
    'views',
    '/home/robbin/school/semester-1/semester-planner/backend/views',
  );

  httpAdapter.use(
    '/static',
    express.static(
      '/home/robbin/school/semester-1/semester-planner/backend/views/static',
    ),
  );

httpAdapter.set('view engine', 'hbs');
  await app.listen(3000);
}
await bootstrap();
