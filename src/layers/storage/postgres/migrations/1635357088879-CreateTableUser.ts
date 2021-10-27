import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1635357088879 implements MigrationInterface {
  private readonly tableName = 'user';

  public async up(queryRunner: QueryRunner): Promise<void> {
    //
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.${this.tableName}`);
  }
}
