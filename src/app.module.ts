import { Module, Logger, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';
// import { DatabaseModule } from './modules/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDB } from './appDB.entity';
import { TestOrmModule } from './test-orm/test-orm.module';
// import { TestOrmController } from './test-orm/test-orm.controller';
import { TestOrm } from './test-orm/test-orm.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [AppDB, TestOrm],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([AppDB]),
    TestOrmModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, Logger],
})
export class AppModule {
  // let's add a middleware on all routes
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
