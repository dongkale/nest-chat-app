import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private readonly logger = new Logger(TransformInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    // this.logger.log(`Interceptor:: ${JSON.stringify(context, null, 2)}`);
    // return next.handle().pipe(map((data) => ({ data })));

    // const client: Client = context.switchToWs().getClient();
    // this.logger.log(`Interceptor: ${context.id}`);

    const client = context.switchToWs().getClient();
    const recvData = context.switchToWs().getData();
    this.logger.log(`Client: ${client.id}, Data: ${recvData}`);

    // throw new ForbiddenException();
    // return null;
    return next.handle();
    // 스킵 하는 방법은
    // return throwError(() => err);
  }
}
