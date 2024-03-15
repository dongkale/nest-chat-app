import { NestFactory } from '@nestjs/core';
// import { WinstonModule } from 'nest-winston';
// import { transports, format } from 'winston';
// import 'winston-daily-rotate-file';
// import * as dotenv from 'dotenv';
import { winstonLogger } from './common/logger/winston.util';
import { AppModule } from './app.module';
import 'winston-daily-rotate-file';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, {
  //   logger: WinstonModule.createLogger({
  //     transports: [
  //       // // file on daily rotation (error only)
  //       // new transports.DailyRotateFile({
  //       //   // %DATE will be replaced by the current date
  //       //   filename: `logs/%DATE%-error.log`,
  //       //   level: 'error',
  //       //   format: format.combine(
  //       //     format.timestamp(),
  //       //     format.cli(),
  //       //     format.splat(),
  //       //     format.timestamp(),
  //       //     format.printf((info) => {
  //       //       return `${info.timestamp} ${info.level}: ${info.message}`;
  //       //     }),
  //       //   ),
  //       //   datePattern: 'YYYY-MM-DD',
  //       //   zippedArchive: false, // don't want to zip our logs
  //       //   maxFiles: '30d', // will keep log until they are older than 30 days
  //       // }),
  //       // same for all levels
  //       new transports.DailyRotateFile({
  //         filename: `logs/%DATE%.log`,
  //         format: format.combine(
  //           format.timestamp(),
  //           format.cli(),
  //           format.splat(),
  //           format.timestamp(),
  //           format.printf((info) => {
  //             return `${info.timestamp} ${info.level}: ${info.message}`;
  //           }),
  //         ),
  //         datePattern: 'YYYY-MM-DD',
  //         zippedArchive: false,
  //         maxSize: '20m',
  //         maxFiles: '30d',
  //       }),
  //       new transports.Console({
  //         format: format.combine(
  //           format.cli(),
  //           format.splat(),
  //           format.timestamp(),
  //           format.printf((info) => {
  //             return `${info.timestamp} ${info.level}: ${info.message}`;
  //           }),
  //         ),
  //       }),
  //     ],
  //   }),
  // });

  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: winstonLogger('MyApp'),
  });

  await app.listen(3000);
}
bootstrap();
