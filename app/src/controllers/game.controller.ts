
import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import GameService from '../services/gameService';
import { AppError, NotFoundError, WrongDataType } from '../errors/AppError';

export class GameController{
    private gameService: GameService;

    private getId(req: Request){
        const id = req.params.id as string;
        return id as unknown as number;
    }

    constructor(gameService: GameService){
        this.gameService = gameService;
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.gameService.getAll();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req : Request, res: Response, next: NextFunction) {
        try {
            const result = await this.gameService.getById({id: this.getId(req)});
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async create(req : Request, res: Response, next: NextFunction) {
        try {
            const result = await this.gameService.postGame(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async update(req : Request, res: Response, next: NextFunction) {
        try {
            const game = await this.gameService.getById({id: this.getId(req)});
            if(!game) throw new NotFoundError();
            const result = await this.gameService.putGame({...req.body, id: game.id});
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req : Request, res: Response, next: NextFunction) {
        try {
            const game = await this.gameService.getById({id: this.getId(req)});
            if(!game) throw new NotFoundError();
            const result = await this.gameService.delete({id: game.id});
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}