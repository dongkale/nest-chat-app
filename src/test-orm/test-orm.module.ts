import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestOrmController } from './test-orm.controller';
import { TestOrmService } from './test-orm.service';
import { TestOrm } from './test-orm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestOrm])],
  exports: [TypeOrmModule],
  controllers: [TestOrmController],
  providers: [TestOrmService],
})
export class TestOrmModule {}
