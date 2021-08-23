import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminSchema } from "./schemas/admin.schema";
import { User, UserSchema } from "./schemas/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    controllers: [UserController],
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }, 
            { name: Admin.name, schema: AdminSchema }
        ])
    ],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}