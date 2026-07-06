import { queryStudio } from "../db/connection";

// GET /api/studios — Obtener todos los estudios (público)
export async function findAll() {
    try {
        const sql = 'SELECT * FROM Studios';
        const result = await queryStudio(sql, []);
        return result?.rows.length > 0? result.rows: null;
    } catch (err) {
        console.error('Error getting studios', err);
    }

    return null;
}

// GET /api/studios/:id — Obtener un estudio por su ID (público)
export async function findById(id : number) {
    try {
        const sql = 'SELECT * FROM Studios WHERE id = $1';
        const result = await queryStudio(sql, [id]);
        return result?.rows.length > 0? result.rows[0]: null;
    } catch (err) {
        console.error('Error getting studio', err);
    }
    return null;
}

// POST /api/studios — Crear un nuevo estudio (requiere autenticación)
export async function createStudio(name: string) {
    try {
        const sql = 'INSERT INTO Studios (name) values ($1) RETURNING *';
        const result = await queryStudio(sql, [name]);
        return result.rows.length > 0? result.rows[0]: null;
    } catch (err) {
        console.error('Error getting studio', err);
    }
    return null;
}

// PUT /api/studios/:id — Actualizar un estudio (requiere autenticación)
export async function updateOne(id: number, name: string) {
    try {
        const sql = 'UPDATE Studios set name = $1 where id = $2';
        const result = await queryStudio(sql, [name, id]);
        return result.rows.length > 0? result.rows[0]: null;
    } catch (err) {
        console.error('Error updating studio', err);
    }
    return null;
}

// DELETE /api/studios/:id — Eliminar un estudio (requiere autenticación)
export async function deleteById(id: number) {
    try {
        const sql = 'DELETE FROM Studios where id = $1';
        const result = await queryStudio(sql, [id]);
        return result.rows.length > 0? result.rows[0]: null;
    } catch (err) {
        console.error('Error updating studio', err);
    }
    return null;
}

// GET /api/studios/:id/games — Obtener todos los videojuegos de un estudio (JOIN, público)
export async function getGames(id: number) {
    try {
        const sql = 'SELECT * FROM Games where studio_id = $1';
        const result = await queryStudio(sql, [id]);
        return result.rows.length > 0? result.rows: null;
    } catch (err) {
        console.error('Error getting studios', err);
    }
    return null;
}
