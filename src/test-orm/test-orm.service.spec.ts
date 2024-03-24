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

const mockPostRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
  delete: jest.fn(),
});

// class MockRepository {
//   async findOne(id) {
//     const user: TestOrm = new TestOrm();
//     user.id = id;
//     return user;
//   }
// }

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('PostService', () => {
  let service: TestOrmService;
  let repository: MockRepository<TestOrm>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [AppModule],
      // imports: [
      //   TypeOrmModule.forRoot({
      //     type: 'mysql',
      //     host: '52.79.52.203',
      //     port: 3306,
      //     username: 'lennon',
      //     password: 'lennon0108!',
      //     database: 'test',
      //     entities: [TestOrm],
      //     synchronize:
      //       true /* synchronize: true는 운영에서는 사용하지 마세요. */,
      //   }),
      // ],
      providers: [
        TestOrmService,
        {
          provide: getRepositoryToken(TestOrm),
          useValue: mockPostRepository(),
          // useClass: MockRepository,
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

  // describe('create()', () => {
  //   it.todo('should fail on exception');
  //   it.todo('should create Posts');
  // });

  describe('create()', () => {
    const createArgs = {
      name: 'name_11',
      version: 'version_11',
    };

    // const testOrm: TestOrm = {
    //   id: 0,
    //   name: 'name_11',
    //   version: 'version_11',
    // };

    it('should fail on exception', async () => {
      // postRepository.save() error 발생
      repository.save.mockRejectedValue('save error'); // 실패할꺼라고 가정한다.

      const result = await service.create(createArgs);
      // console.log('result:', result);
      expect(result).toEqual('save error'); // 진짜 에러 발생했넴

      // expect(result).resolves.toEqual(testOrm);
    });

    it('should create Posts', async () => {
      repository.save.mockResolvedValue(createArgs); // 성공할꺼라고 가정한다.
      const result = await service.create(createArgs); //

      expect(repository.save).toHaveBeenCalledTimes(1); // save가 1번 불러졌니?
      expect(repository.save).toHaveBeenCalledWith(createArgs); // 매개변수로 createArgs가 주어졌니?

      expect(result).toEqual(createArgs); // 이 create() method의 결과가 `createArgs`와 똑같니?
    });
  });

  describe('findAll()', () => {
    it('should be find All', async () => {
      repository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledTimes(1);

      expect(result).toEqual([]);
    });
    it('should fail on exception', async () => {
      repository.find.mockRejectedValue('find error');
      const result = await service.findAll();
      expect(result).toEqual('find error');
    });
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
