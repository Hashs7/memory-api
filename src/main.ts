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
  let app;

  if (process.env.NODE_ENV === 'development') {
    httpsOptions = {
      key: fs.readFileSync('./cert/key.pem'),
      cert: fs.readFileSync('./cert/cert.pem'),
    };
    app = await NestFactory.create(AppModule, { httpsOptions });
  } else {
    app = await NestFactory.create(AppModule);
  }

  app.enableCors();
  app.use(compression());

  const config = new DocumentBuilder()
    .setTitle('Memory API')
    .setVersion('0.0.2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);

  Logger.log(await app.getUrl());
}
bootstrap();
