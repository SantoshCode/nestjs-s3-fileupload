import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';

// import { ConfigService } from '@nestjs/config';
// import { S3 } from '@aws-sdk/client-s3';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(json({ limit: '50mb' }));

  // config aws-sdk

  //   const configService = app.get(ConfigService);

  //   S3.({
  //     accessKeyId: configService.get('aws.accessKeyId'),
  //     secretAccessKey: configService.get('aws.secretAccessKey'),
  //     region: configService.get('aws.region'),
  //   });

  app.listen(3000).then(() => {
    console.log(`Server is running on 3000`);
  });
}
bootstrap();
