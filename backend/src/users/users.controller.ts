import { Body, Controller, Get, NotFoundException, Param, Patch, Query } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UsersService } from './users.service';
import { UserDto } from '../dtos/user.dto'
import { UpdateUserDto } from '../dtos/update-user.dto'
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) {}

    @Get('/:id')
    async findUserById(@Param('id') id: string) {
        const user = await this.usersService.findById(parseInt(id));
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Get()
    findUserByName(@Query('username') username: string) {
        return this.usersService.findByName(username);
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        const user = await this.authService.update(parseInt(id), body);
        return user;
    }
}
