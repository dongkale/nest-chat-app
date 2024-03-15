import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestOrm } from './test-orm.entity';
import { Chat } from '../chat/chat.entity';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { ChatService } from '../chat/chat.service';
// import { AppDB } from '../appDB.entity';

@Injectable()
export class TestOrmService {
  constructor(
    @InjectRepository(TestOrm)
    private testOrmRepository: Repository<TestOrm>,
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    private chatService: ChatService,
  ) {}

  findAll(): Promise<TestOrm[]> {
    return this.testOrmRepository.find();
  }

  findOne(id: number): Promise<TestOrm> {
    return this.testOrmRepository
      .find({
        where: [{ id: id }],
      })
      .then((result) => result[0]);
  }

  async create(testOrm: TestOrm): Promise<TestOrm> {
    return this.testOrmRepository.save(testOrm);
  }

  async remove(id: number): Promise<void> {
    await this.testOrmRepository.delete(id);
  }

  //   async update(id: number, testOrm: TestOrm): Promise<TestOrm> {
  //     await this.testOrmRepository.update(id, testOrm);
  //     return this.testOrmRepository
  //       .find({
  //         where: [{ id: id }],
  //       })
  //       .then((result) => result[0]);
  //   }

  async update(id: number, testOrm: TestOrm): Promise<void> {
    const existedTestOrm = await this.testOrmRepository
      .find({
        where: [{ id: id }],
      })
      .then((result) => result[0]);

    if (existedTestOrm) {
      await this.testOrmRepository.update(id, testOrm);
      //   await getConnection()
      //     .createQueryBuilder()
      //     .update(TestOrm)
      //     .set({
      //       id: testOrm.id,
      //       name: testOrm.name,
      //       version: testOrm.version,
      //     })
      //     .where('id = :id', { id: id })
      //     .execute();

      //
    }
  }

  @Transactional()
  async query__(): Promise<TestOrm> {
    // 같은 리포지토리에서 트랜젝션
    await this.testOrmRepository.query(
      `UPDATE test_orm SET version = '===' WHERE id=2`,
    );

    // throw new Error();

    await this.testOrmRepository.query(
      `UPDATE test_orm SET version = '=====' WHERE id=1`,
    );

    const s = await this.testOrmRepository.query(`SELECT * FROM test_orm`);

    // 다른 리포지토리에서 트랜젝션
    await this.testOrmRepository.query(
      `UPDATE test_orm SET version = '+++' WHERE id=1`,
    );

    throw new Error();

    await this.chatRepository.query(
      `UPDATE chat SET message = '+++' WHERE id=1`,
    );

    return s[1];
  }
}
