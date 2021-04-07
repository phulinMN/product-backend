import { ConnectionOptions } from 'typeorm';
const config: ConnectionOptions = {
  type: 'mysql',
  port: 33061,
  host: '127.0.0.1',
  username: 'root',
  password: 'secret',
  database: 'product_test_db',
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/migration/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
  synchronize: false,
};

export = config;
