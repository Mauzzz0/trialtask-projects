import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUserTagListTag1635357107843 implements MigrationInterface {
  private readonly tableName = 'user_tag_list_tag';

  public async up(queryRunner: QueryRunner): Promise<void> {
    //
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.${this.tableName}`);
  }
}
