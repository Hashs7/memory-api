import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function bootstrap() {
  let httpsOptions = {};
  if (process.env.NODE_ENV === 'development') {
    httpsOptions = {
      key: fs.readFileSync('./cert/key.pem'),
      cert: fs.readFileSync('./cert/cert.pem'),
    };
  }

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.enableCors();
  app.use(compression());

  const config = new DocumentBuilder()
    .setTitle('Memory API')
    .setVersion('0.0.2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  Logger.log(`PORT = ${process.env.PORT}`);
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
  Logger.log(await app.getUrl());
}
bootstrap();
