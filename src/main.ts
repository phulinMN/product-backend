import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // origin: [/\.globish\.co.th$/, /\.globish\.dev$/],
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Product Backend')
    .setDescription('The product API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // added validate pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const errorMessages = {};
        errors.map((error) => {
          errorMessages[error?.property] = Object.values(error?.constraints)
            .join('. ')
            .trim();
        });
        return new BadRequestException({
          error: 'Bad Request',
          inputError: errorMessages,
        });
      },
    }),
  );
  await app.listen(3030);
}
bootstrap();
