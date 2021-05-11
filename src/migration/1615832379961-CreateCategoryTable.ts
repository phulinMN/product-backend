import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategoryTable1615832379961 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'image', type: 'varchar' },
          { name: 'description', type: 'varchar' },
        ],
      }),
    );
    //
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
    await queryRunner.dropTable('categories');
  }
}
