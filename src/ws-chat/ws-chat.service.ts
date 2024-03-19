import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from './dto/user-data.dto';

@Injectable()
export class WsChatService {
  private readonly logger = new Logger(WsChatService.name);

  private wsClients: Array<UserDto> = [];

  addUser(index: number, client: any): string {
    this.wsClients.push({ index: index, data: client });
    return client;
  }
}
