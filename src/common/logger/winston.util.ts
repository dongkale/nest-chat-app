import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

const dailyOption = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    // dirname: `./logs/${level}`,
    // filename: `logs/%DATE%.${level}.log`,
    filename: `logs/%DATE%.log`,
    maxFiles: 30,
    zippedArchive: false,
    format: winston.format.combine(
      winston.format.timestamp(),
      utilities.format.nestLike(process.env.NODE_ENV, {
        colors: false,
        prettyPrint: true,
      }),
    ),
  };
};

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'http' : 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike(process.env.NODE_ENV, {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
    new winstonDaily(dailyOption('info')),
    new winstonDaily(dailyOption('debug')),
    new winstonDaily(dailyOption('warn')),
    new winstonDaily(dailyOption('error')),
  ],
});

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
