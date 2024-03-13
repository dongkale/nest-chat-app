import { Module, Logger, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전체적으로 사용하기 위해
      // envFilePath: `.${process.env.NODE_ENV}.env`,
      envFilePath: `.env`,
    }),
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
