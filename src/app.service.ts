import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): string {
    return 'Home';
  }

  getHello(): string {
    return 'Hello !';
  }

  getWorld(): string {
    return 'World!';
  }
}
