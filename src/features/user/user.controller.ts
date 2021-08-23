import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './schemas/user.schema';
import { Param } from '@nestjs/common';
import { Admin } from './schemas/admin.schema';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() createCatDto: CreateUserDto) {
    await this.userService.create(createCatDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  async checkIsAdmin(
    @Param('id') id: string,
  ): Promise<Admin> {
    return this.userService.isUserAdmin({ userId: id });
  }
}