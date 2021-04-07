import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnLastNameUser1617810358663 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`ALTER TABLE users ADD lastname VARCHAR(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('users', 'lastname');
  }
}
