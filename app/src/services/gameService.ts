import { hashPassword, verifyPassword } from "./password.service";
import { AppError } from "../errors/AppError";
import * as gameRepository from "../repositories/game.repository";
import { User } from "../models/User.model";
import TokenService from "./token.service";

//import * as refreshTokenService from "./refreshToken.service.js";

export default class GameService{

    constructor(){
    }

    async get({ id }: {id: number}) {
        if(!id){
            const games = await gameRepository.findAll();
            return games || [];
        }
        const game = await gameRepository.findById(id);
        if (!game) throw new AppError("Game no encontrado", 404);
        return game;
    }

    async postGame({ title, 
                    releaseDate, 
                    director, 
                    studioId }: {title: string,
            releaseDate: Date,
            director: string,
            studioId: number}) {
        const game = await gameRepository.createGame(title, releaseDate, director, studioId);
        if (!game) throw new AppError("Game no encontrado", 400);

        return game;
    }

    async putGame({ id, title, 
                    releaseDate, 
                    director, 
                    studioId }: {id: number, title: string,
            releaseDate: Date,
            director: string,
            studioId: number}) {
        const game = await gameRepository.updateOne(id, title, releaseDate, director, studioId);
        if (!game) throw new AppError("Game no encontrado", 400);

        return game;
    }

    async delete({ id }: {id: number}) {
        const game = (await gameRepository.deleteById(id));
        if (!game) throw new AppError("Game no encontrado", 400);

        return game;
    }
}
