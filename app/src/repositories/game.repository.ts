import { queryGame } from "../db/connection";
import { Game } from "../models/Game.model";

// GET /api/games — Obtener todos los games (público)
export async function findAll() {
    try {
        const sql = 'SELECT * FROM Games';
        const result = await queryGame(sql, []);
        return result?.rows.length > 0? result.rows: null;
    } catch (err) {
        console.error('Error getting games', err);
    }

    return null;
}

// GET /api/games/:id — Obtener un egame por su ID (público)
export async function findById(id : number) {
    try {
        const sql = 'SELECT * FROM Games WHERE id = $1';
        const result = await queryGame(sql, [id]);
        return result?.rows.length > 0? result.rows[0]: null;
    } catch (err) {
        console.error('Error getting game', err);
    }
    return null;
}

// POST /api/games — Crear un nuevo egame (requiere autenticación)
export async function createGame(title: string,
                                    releaseDate: Date,
                                    director: string,
                                    studioId: number) {
    try {
        const sql = 'INSERT INTO Games (title, releaseDate, director, studioId) values ($1, $2, $3, $4) RETURNING *';
        const result = await queryGame(sql, [title, releaseDate, director, studioId]);
        return result.rows.length > 0? result.rows[0]: null;
    } catch (err) {
        console.error('Error adding game', err);
    }
    return null;
}

// PUT /api/games/:id — Actualizar un egame (requiere autenticación)
export async function updateOne(id: number, 
                                title: string,
                                releaseDate: Date,
                                director: string,
                                studioId: number) {
    try {
        const sql = 'UPDATE Games set title = $2, releaseDate = $3, director = $4, studioId = $5 where id = $1 RETURNING *';
        const result = await queryGame(sql, [id, title, releaseDate, director, studioId]);
        return result.rows.length > 0? result.rows[0]: null;
    } catch (err) {
        console.error('Error updating game', err);
    }
    return null;
}

// DELETE /api/games/:id — Eliminar un egame (requiere autenticación)
export async function deleteById(id: number) {
    try {
        const sql = 'DELETE FROM Games where id = $1 RETURNING *';
        const result = await queryGame(sql, [id]);
        return result.rows.length > 0? result.rows[0]: null;
    } catch (err) {
        console.error('Error updating game', err);
    }
    return null;
}