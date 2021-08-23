import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ default: false })
  isAdmin: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);