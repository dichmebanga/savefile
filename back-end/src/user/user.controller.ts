import { Controller, Get, Param, Post, UseInterceptors, UploadedFiles, Response, UploadedFile, HttpException, HttpStatus, Body, BadRequestException } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from './dto/user.dto';
import * as hasher from 'bcrypt'
import { throws } from "assert";
import { throwError } from "rxjs";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/get')
    getAllUser() {
        return this.userService.getAllUser()
    }


    @Post('/login')
    async getUserById(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        const user = await this.userService.findUser({ email })
        if (!user) {
            throw new BadRequestException('invalid creadentials')
        }
        if (!await hasher.compare(password, user.password)) {
            throw new BadRequestException('invalid creadentials')
        }
        return user
    }


    @Post('/register')
    async insertUser(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        const hashPassword = await hasher.hash(password, 12)
        return this.userService.insertUser({
            name, email, password: hashPassword
        })
    }
}