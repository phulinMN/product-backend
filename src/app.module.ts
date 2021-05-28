import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { OrderModule } from './orders/order.module';
import { ProductModule } from './products/product.module';
import { UsersModule } from './users/users.module';
import { ThirdPartyModule } from './third-party/third-party.module';

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
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${file.originalname}`);
        },
      }),
    }),
    AuthModule,
    CategoriesModule,
    UsersModule,
    OrderModule,
    ProductModule,
    ThirdPartyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
