import logger from '#config/logger.js';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { db } from '#config/database.js';
import { users } from '#models/user.model.js';

export const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (e) {
        logger.error(`Error hashing password: ${e}`);
        throw new Error('Error hashing password');
    }
}
export const createdUser = async ({ name, email, password, role = 'user' }) => {
    try {
        const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (existingUser && existingUser.length > 0) {
            // keep the specific message so controller can respond with 409
            throw new Error('User with this email already exists');
        }

        const passwordHash = await hashPassword(password);

        const [newUser] = await db
            .insert(users)
            .values({ name, email, password: passwordHash, role })
            .returning({ id: users.id, name: users.name, email: users.email, role: users.role, created_at: users.created_at });

        logger.info(`New user created: ${email}`);

        return newUser;

    } catch (e) {
        logger.error(`Error creating user: ${e}`);
        // rethrow so controller can decide how to respond
        throw e;
    }
}