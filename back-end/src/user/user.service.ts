import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';



@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async getAllUser(): Promise<any> {
        return await this.userRepository.find()
    }

    async findUser(id:any): Promise<any>{
        return await this.userRepository.findOne(id)
    }

    async insertUser(dataUser: any): Promise<any> {
      return await this.userRepository.save(dataUser)
    }
}