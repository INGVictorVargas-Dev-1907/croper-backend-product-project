import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

/**
 * Esquema de usuario para MongoDB usando Mongoose.
 * - Define las propiedades del usuario: email, password (hash) y role (user/admin).
 * - Incluye timestamps automáticos para createdAt y updatedAt.
 * - Se utiliza en el módulo de autenticación para gestionar usuarios.
 * @see AuthModule
 */
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, trim: true })
    fullname: string;

    @Prop({ required: true, unique: true, lowercase: true, trim: true})
    email: string;

    @Prop({ required: true }) // hash
    password: string;

    @Prop({ default: 'user', enum: ['user', 'admin'] })
    role: 'user' | 'admin';
}

export const UserSchema = SchemaFactory.createForClass(User);