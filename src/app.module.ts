import { Module, Logger, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { LoggerMiddleware } from './common/logger/logger.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway, Logger],
})
export class AppModule {
  // let's add a middleware on all routes
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
