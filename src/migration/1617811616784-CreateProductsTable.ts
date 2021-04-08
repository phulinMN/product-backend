import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductsTable1617811616784 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'category_id',
            type: 'int',
            isNullable: true,
          },
          { name: 'name', type: 'varchar' },
          { name: 'image', type: 'varchar' },
          { name: 'price', type: 'decimal', default: 0 },
          { name: 'description', type: 'varchar' },
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
        foreignKeys: [
          {
            name: 'fk_products_categories',
            columnNames: ['category_id'],
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
