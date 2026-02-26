import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

let cachedApp: any;

async function createApp() {
  if (cachedApp) {
    return cachedApp;
  }

  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp)
  );

  // app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      exceptionFactory: (errors) => {
        const errorsMessages = errors
          .filter((e) => {
            const msg = e.constraints ? Object.values(e.constraints)[0] : '';
            return typeof msg === 'string' && !msg.includes('should not exist');
          })
          .map((e) => ({
            message: e.constraints ? Object.values(e.constraints)[0] : 'Validation failed',
            field: e.property,
          }));
        return new BadRequestException({ errorsMessages });
      },
    })
  );

  await app.init();
  cachedApp = expressApp;
  return expressApp;
}

export default async function handler(req: any, res: any) {
  const app = await createApp();
  return app(req, res);
}
