import { hashPassword, verifyPassword } from "./password.service";
import { AppError } from "../errors/AppError";
import * as studioRepository from "../repositories/studio.repository";
import { User } from "../models/User.model";
import TokenService from "./token.service";
import GameService from "./gameService";

//import * as refreshTokenService from "./refreshToken.service.js";

export default class StudioService{

    constructor(private gameService: GameService){
        this.gameService = gameService;
    }

    async getAll() {
        const games = await studioRepository.findAll();
        return games || [];
    }

    async getById({ id }: {id: number}) {
        const game = await studioRepository.findById(id);
        if (!game) throw new AppError("Game no encontrado", 404);
        return game;
    }

    async postStudio({ name }: {name: string}) {
        try{
            const studio = (await studioRepository.createStudio(name));
            if (!studio) throw new AppError("Studio no encontrado", 400);
            return studio;
        }
        catch(error: any){

        }
        return null;
        
    }

    async putStudio({ name, id }: {name: string, id: number}) {
        const studio = (await studioRepository.updateOne(id, name));
        if (!studio) throw new AppError("Studio no encontrado", 404);

        return studio;
    }

    async delete({ id }: {id: number}) {
        const games = await this.getGames({id});
        if(games && games.length > 0) throw new AppError("No se puede borrar un estudio con juegos", 409);
        const studio = (await studioRepository.deleteById(id));
        if (!studio) throw new AppError("Studio no encontrado", 400);

        return studio;
    }

    async getGames({ id }: {id: number}) {
        const games = (await studioRepository.getGames(id));
        if (!games) throw new AppError("Studio no encontrado", 400);

        return games;
    }
}
