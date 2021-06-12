import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function bootstrap() {
  let httpsOptions = {};
  console.log(process.env.NODE_ENV);
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
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(parseInt(process.env.PORT) | 3000);
}
bootstrap();
