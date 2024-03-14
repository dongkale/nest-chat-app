import { Test, TestingModule } from '@nestjs/testing';
import { TestOrmController } from './test-orm.controller';

describe('TestOrmController', () => {
  let controller: TestOrmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestOrmController],
    }).compile();

    controller = module.get<TestOrmController>(TestOrmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
