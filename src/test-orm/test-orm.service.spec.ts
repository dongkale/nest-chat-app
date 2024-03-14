import { Test, TestingModule } from '@nestjs/testing';
import { TestOrmService } from './test-orm.service';

describe('TestOrmService', () => {
  let service: TestOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestOrmService],
    }).compile();

    service = module.get<TestOrmService>(TestOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
