import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(parseInt(process.env.PORT) | 3000);
  console.log(await app.getUrl());
  console.log('port : ', parseInt(process.env.PORT) | 3000);
}
bootstrap();
