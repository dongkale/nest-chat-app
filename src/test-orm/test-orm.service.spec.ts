import { Test, TestingModule } from '@nestjs/testing';
import { TestOrmService } from './test-orm.service';
import { AppModule } from '../app.module';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';

describe('TestOrmService', () => {
  let service: TestOrmService;

  beforeEach(async () => {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [TestOrmService],
    // }).compile();

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<TestOrmService>(TestOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
