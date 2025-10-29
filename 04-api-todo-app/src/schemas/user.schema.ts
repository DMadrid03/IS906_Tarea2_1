import z from 'zod';
import User  from '../interfaces/user.interface';

// establecer el idioma en español
z.config(z.locales.es());

const UserSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1).max(100),
    email: z.email()
});
const createUserSchema = UserSchema.omit({ id: true });

export const validateUser = (user: Partial<User>) => {
    return UserSchema.safeParse(user);
}

export const validateUserPartial = (user: Partial<User>) => {
    return UserSchema.partial().safeParse(user);
}

export const validateCreateUser = (user: Partial<User>) => {
    return createUserSchema.safeParse(user);
}