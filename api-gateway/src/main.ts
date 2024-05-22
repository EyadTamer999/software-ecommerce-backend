/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  await app.listen(3001);
=======
  await app.listen(3000);
>>>>>>> e4cc43b3 (Initial)
}
bootstrap();
