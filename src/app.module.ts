import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 33061,
      host: '127.0.0.1',
      username: 'root',
      password: 'secret',
      database: 'product_test_db',
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migration/**/*.ts'],
      cli: {
        migrationsDir: 'dist/migration',
      },
      synchronize: false,
    }),
    CategoriesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
