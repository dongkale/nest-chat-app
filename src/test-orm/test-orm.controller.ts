import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Logger,
  Body,
} from '@nestjs/common';
import { TestOrmService } from './test-orm.service';
import { TestOrm } from './test-orm.entity';

@Controller('test-orm')
export class TestOrmController {
  private readonly logger = new Logger(TestOrmController.name);

  constructor(private testOrmService: TestOrmService) {}

  @Get()
  findAll(): Promise<TestOrm[]> {
    return this.testOrmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<TestOrm> {
    return this.testOrmService.findOne(id);
  }

  @Post()
  create(@Body() testOrm: TestOrm): Promise<TestOrm> {
    return this.testOrmService.create(testOrm);
  }

  @Delete()
  remove(@Param('id') id: number): Promise<void> {
    return this.testOrmService.remove(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() testOrm: TestOrm) {
    this.testOrmService.update(id, testOrm);
  }

  @Get('query')
  query() {
    return this.testOrmService.query__();
  }
}
