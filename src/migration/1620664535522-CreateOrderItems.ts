import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderItems1620664535522 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_items',
        columns: [
          { name: 'id', type: 'int', isPrimary: true },
          {
            name: 'product_id',
            type: 'int',
          },
          {
            name: 'order_id',
            type: 'int',
          },
          { name: 'quantity', type: 'int' },
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
          {
            name: 'deleted_at',
            type: 'DATETIME',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_order_items_products',
            columnNames: ['product_id'],
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
          },
          {
            name: 'fk_order_items_orders',
            columnNames: ['order_id'],
            referencedTableName: 'orders',
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
