import { Module } from '@nestjs/common';
import { PDFModule } from './PDF/pdf.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { MongooseModule } from '@nestjs/mongoose'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/file'),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      // url: 'mongodb+srv://admin:admin@cluster0.gphjhaw.mongodb.net/?retryWrites=true&w=majority',
      url: 'mongodb://localhost:27017',
      database:'nestjs',
      useNewUrlParser: true,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User],
    }),
    // RedisModule.forRoot({
    //   config: {
    //     host: 'localhost',
    //     port: 6379,
    //     password: 'authpassword'
    //   }
    // }),
    PDFModule,
    UserModule
  ],

})
export class AppModule { }
