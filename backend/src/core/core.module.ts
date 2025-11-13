import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '../config';
import { LoggerService } from './logger/logger.service';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RequestMethod } from '@nestjs/common/enums';
import { DatabaseModule } from '../database/database.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
