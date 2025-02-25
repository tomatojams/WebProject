import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('App');

  console.log('SWAGGER_ENABLED:', process.env.SWAGGER_ENABLED);

  if (process.env.SWAGGER_ENABLED === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Modoc API')
      .setDescription('The Modoc API description')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      })
      .build();

    logger.log(`Server running on port http://localhost:3000/api`);
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
    credentials: true,
  });
  try {
    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    logger.error('Application failed to listen on port', { error });
  }
}
bootstrap().catch((error) => {
  console.error(error);
});
