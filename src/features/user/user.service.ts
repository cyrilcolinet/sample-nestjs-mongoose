import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckAdminUserDto } from './dtos/checck-admin-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { User, UserDocument } from './schemas/user.schema';
import { LoginUserDto } from './dtos/login-user.dto';
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    const createdAdmin = new this.adminModel({user: createdUser});
    createdUser.save();
    createdAdmin.save();
  }

  async login(loginUserDto: LoginUserDto) {
    const userExists = await this.userModel.exists({ email: loginUserDto.email });
    if (!userExists) {
      throw new HttpException('Login invalid', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userModel.findOne({ email: loginUserDto.email }).exec();
    if (user.password !== loginUserDto.password) {
      throw new HttpException('Password invalid', HttpStatus.UNAUTHORIZED);
    }

    // ...
    return { statusCode: 200, message: "ey....." };
  }

  async isUserAdmin(checkAdminUserDto: CheckAdminUserDto): Promise<Admin> {
      const user = await this.userModel
        .findById(checkAdminUserDto.userId)
        .exec();

      return this.adminModel.findOne({ user }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}