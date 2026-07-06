import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { refreshTokens } from "../db/schema.js";

export async function create({ token, userId, expiresAt }) {
    return db
        .insert(refreshTokens)
        .values({ token, userId, expiresAt, revokedAt: null })
        .run();
}

export async function findByToken(token) {
    return db
        .select()
        .from(refreshTokens)
        .where(eq(refreshTokens.token, token))
        .get();
}

export async function revoke(token) {
    return db
        .update(refreshTokens)
        .set({ revokedAt: new Date() })
        .where(eq(refreshTokens.token, token))
        .run();
}

export async function revokeAllForUser(userId) {
    return db
        .update(refreshTokens)
        .set({ revokedAt: new Date() })
        .where(eq(refreshTokens.userId, userId))
        .run();
}
