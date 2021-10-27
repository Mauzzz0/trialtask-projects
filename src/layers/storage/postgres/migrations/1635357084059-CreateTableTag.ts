import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTag1635357084059 implements MigrationInterface {
  private readonly tableName = 'tag';

  public async up(queryRunner: QueryRunner): Promise<void> {
    //
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.${this.tableName}`);
  }
}
