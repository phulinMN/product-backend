import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1617729876152 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'int', isPrimary: true },
          { name: 'username', type: 'varchar' },
          { name: 'email', type: 'varchar' },
          { name: 'firstname', type: 'varchar' },
          { name: 'password', type: 'varchar' },
          {
            name: 'created_at',
            type: 'DATETIME',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'DATETIME',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
    await queryRunner.dropTable('users');
  }
}
