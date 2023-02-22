import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

const currentProjectPath = path.resolve();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get('database.type'),
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          entities: [currentProjectPath + '/src/entities/*.entity{.ts}'],
          database: configService.get('database.name'),
          synchronize: true,
          autoLoadEntities: true,
        } as TypeOrmModuleOptions),
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRoot({
    //   type: configuration().database.,
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'santosh',
    //   password: 'pass123',
    //   entities: [currentProjectPath + '/src/entities/*.entity{.ts}'],
    //   database: 's3',
    //   synchronize: true,
    //   autoLoadEntities: true,
    // }),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
