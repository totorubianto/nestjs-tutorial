import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import { HttpExceptionFilter } from './common/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(GlobalMiddleware);
  await app.listen(3000);
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.use(logger);
  console.log('🚀 Runing on port 3000');
}

bootstrap();
