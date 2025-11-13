import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common/pipes';
import { LoggerService } from './core/logger/logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { METHODS } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(LoggerService));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    origin:[process.env.ALLOWED_ORG,'http://localhost:3000'],
     credentials: true,  

  });

  const config = new DocumentBuilder()
    .setTitle('Vison Age VFX API')
    .setDescription('API documentation for Vison Age VFX')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  const host = `0.0.0.0`;
  await app.listen(port, host);

  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`documentation is available at: http://localhost:${port}/docs`);
}
bootstrap();
