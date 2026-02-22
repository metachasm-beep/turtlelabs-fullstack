import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3001, '127.0.0.1'); // Using 3001 to avoid React/Next.js port conflicts
}
bootstrap();
