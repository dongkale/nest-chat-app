import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestOrm } from './test-orm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestOrmService {
  constructor(
    @InjectRepository(TestOrm)
    private testOrmRepository: Repository<TestOrm>,
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

  async query__(): Promise<void> {
    await this.testOrmRepository.query(
      `UPDATE test_orm SET version = '===' WHERE id=2`,
    );

    const s = await this.testOrmRepository.query(`SELECT * FROM test_orm`);

    return;
  }
}
