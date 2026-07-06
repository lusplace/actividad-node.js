import bcrypt from 'bcrypt';

const SALT_ROUNDS = 15;

export async function hashPassword(plainPassword : string) {
    return await bcrypt.hash(plainPassword, SALT_ROUNDS);
}

export async function verifyPassword(plainPassword : string, hash: string) {
    return await bcrypt.compare(plainPassword, hash);
}