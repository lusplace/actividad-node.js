
import { queryUser } from '../db/connection';
import { User } from '../models/User.model';

export async function insertUser(firstName: string, lastName: string, email: string, password: string, username: string, role: string): Promise<User | undefined>
 {
    console.log('start insert user', firstName, lastName, email, password, username, role)
    try {
        const sql = 'INSERT INTO Users (firstName, lastName, email, password, username, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [firstName, lastName, email, password, username, role];
        const result = await queryUser(sql, values);
        console.log('Inserted user:', result);
        return result as unknown as User;
    } catch (err) {
        console.error('Error inserting user', err);
    }
}

export async function getAllUsers() {
    try {
        const sql = 'SELECT * FROM Users RETURNING *';
        const result = await queryUser(sql, []);
        console.log('Returned users:', result);
    } catch (err) {
        console.error('Error getting users', err);
    }
}

export async function getUserByEmail(email: string) {
    console.log('check for existing mail');
    try {
        const sql = 'SELECT * FROM Users WHERE email = $1';
        const result = await queryUser(sql, [email]);
        console.log('Returned user:', result);
        return result?.rows.length > 0? result.rows[0]: null;
    } catch (err) {
        console.error('Error inserting user', err);
    }
}
 
