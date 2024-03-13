import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getHome(): string {
    this.logger.log('Calling getHome()', AppController.name);
    // this.logger.warn('Calling getHome()', AppController.name);
    // this.logger.debug('Calling getHome()', AppController.name);
    // this.logger.error('Calling getHome()', AppController.name);

    return this.appService.getHome();
  }

  @Get('hello')
  getHello(): string {
    this.logger.log('Calling getHello()', AppController.name);
    // this.logger.warn('Calling getHello()', AppController.name);
    // this.logger.debug('Calling getHello()', AppController.name);
    // this.logger.error('Calling getHello()', AppController.name);

    return this.appService.getHello();
  }

  @Get('world')
  getWorld(): string {
    this.logger.log('Calling getWorld()', AppController.name);
    this.logger.debug('Calling getWorld()', AppController.name);
    this.logger.warn('Calling getWorld()', AppController.name);

    try {
      throw new Error();
    } catch (e) {
      this.logger.error('Calling getWorld()', e.stack, AppController.name);
    }

    return this.appService.getWorld();
  }
}
