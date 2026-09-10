import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./user.service.js";
import { CreateUserDto } from "./user.repository.js";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const { password, ...result} = user;
        
        return result;
    }

    async signUp(user: CreateUserDto) {
        const existingUser = await this.usersService.findOne(user.username);

        if (existingUser) {
            throw new Error('Username already exists')
        }

        // todo hash password

        return this.usersService.create(user)
    }
}