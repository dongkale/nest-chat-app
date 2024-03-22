import { Test, TestingModule } from '@nestjs/testing';
import { TestOrmService } from './test-orm.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestOrm } from '../test-orm/test-orm.entity';
import { Repository } from 'typeorm';
import { Chat } from '../chat/chat.entity';
import { ChatService } from '../chat/chat.service';
import { DatabaseModule } from '../common_modules/database.module';

import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';

const testOrmArray = [
  {
    name: 'name #1',
    version: 'version #1',
  },
  {
    name: 'name #2',
    version: 'version #2',
  },
];

const oneTestOrm = {
  name: 'name #1',
  version: 'version #1',
};

const mockPostRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('PostService', () => {
  let service: TestOrmService;
  let repository: MockRepository<TestOrm>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestOrmService,
        {
          provide: getRepositoryToken(TestOrm),
          useValue: mockPostRepository(),
        },
      ],
    }).compile();

    service = module.get<TestOrmService>(TestOrmService);
    repository = module.get<MockRepository<TestOrm>>(
      getRepositoryToken(TestOrm),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it.todo('should fail on exception');
    it.todo('should create Posts');
  });
});

// describe('TestOrmService', () => {
//   let service: TestOrmService;
//   let repository: Repository<TestOrm>;

//   beforeEach(async () => {
//     // initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

//     const module: TestingModule = await Test.createTestingModule({
//       // imports: [AppModule],
//       //   ConfigModule.forRoot({
//       //     isGlobal: true,
//       //     load: [config],
//       //     envFilePath: `.env`,
//       //   }),
//       //   DatabaseModule,
//       //   TypeOrmModule.forFeature([TestOrm, Chat]),
//       // ],
//       // providers: [
//       //   TestOrmService,
//       //   {
//       //     provide: getRepositoryToken(TestOrm),
//       //     useValue: {
//       //       find: jest.fn().mockResolvedValue(testOrmArray),
//       //       findOneBy: jest.fn().mockResolvedValue(oneTestOrm),
//       //       save: jest.fn().mockResolvedValue(oneTestOrm),
//       //       remove: jest.fn(),
//       //       delete: jest.fn(),
//       //     },
//       //   },
//       //   ChatService,
//       // ],
//       providers: [TestOrmService],
//     }).compile();

//     service = module.get<TestOrmService>(TestOrmService);
//     repository = module.get<Repository<TestOrm>>(getRepositoryToken(TestOrm));
//   });

// it('should be defined', () => {
//   expect(service).toBeDefined();
// });

/*
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

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const testOrm: TestOrm = {
        id: 0,
        name: 'firstName #1',
        version: 'version #1',
      };

      expect(
        service.create({
          id: 0,
          name: 'firstName #1',
          version: 'version #1',
        }),
      ).resolves.toEqual(testOrm);
    });
  });
  */
// });
