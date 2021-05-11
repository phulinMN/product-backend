import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableOrder1620662647705 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          { name: 'total_price', type: 'decimal' },
          { name: 'paid_price', type: 'decimal' },
          { name: 'discount_price', type: 'decimal' },
          { name: 'slip', type: 'varchar' },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'success', 'cancel'],
          }, // how to use enum?
          { name: 'address_street', type: 'varchar' },
          { name: 'address_province', type: 'varchar' },
          { name: 'address_district', type: 'varchar' },
          { name: 'address_city', type: 'varchar' },
          { name: 'address_zipcode', type: 'varchar' },
          { name: 'phone', type: 'varchar' },
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
          //   { name: 'description', type: 'varchar' },
        ],
        foreignKeys: [
          {
            name: 'fk_orders_users',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
    //
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
    await queryRunner.dropTable('orders');
  }
}
