import { Body, Param, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor() {
    }

    @Post('createUser')
    public async createUser(@Body() payload: CreateUserDto): Promise<any> {
        return { message: 'User created successfully' }; 
    }

    @Get('getUser/:userId') 
    public async getUser(@Param('userId') userId: number): Promise<any> {
        return { message: 'User retrieved successfully' }; 
    }
}