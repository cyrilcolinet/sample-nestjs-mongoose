import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckAdminUserDto } from './dtos/checck-admin-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { User, UserDocument } from './schemas/user.schema';

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