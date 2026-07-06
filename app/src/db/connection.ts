import dotenv from "dotenv";
import { Pool as Client, QueryResult, QueryResultRow } from 'pg';
import { User } from "../models/User.model";
import { Game } from "../models/Game.model";
import { Studio } from "../models/Studio.model";
dotenv.config();

const DB_HOST = process.env.DB_HOST || '0.0.0.0';
const DB_PORT = process.env.DB_PORT  || 5432 ;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD : string = process.env.DB_PASSWORD || 'password';
const DB_NAME = process.env.DB_NAME || 'db';

export const client = new Client({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT as number, 
  database: DB_NAME
});

export async function
  queryUser (text: string, params: any) : Promise<QueryResult<User>>{
    const res = (await client.query(text, params));
    return res;
  };

export async function
  queryStudio (text: string, params: any) : Promise<QueryResult<Studio>>{
    const res = (await client.query(text, params));
    return res;
  };

export async function
  queryGame (text: string, params: any) : Promise<QueryResult<Game>>{
    const res = (await client.query(text, params));
    return res;
  };



