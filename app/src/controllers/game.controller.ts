
import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import GameService from '../services/gameService';

export class GameController{
    private gameService: GameService;

    constructor(gameService: GameService){
        this.gameService = gameService;
    }

    async get(req : Request, res: Response, next: NextFunction) {
        try {
            const result = await this.gameService.get(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req : Request, res: Response, next: NextFunction) {
        try {
            const result = await this.gameService.get(req.body);
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
            const result = await this.gameService.putGame(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req : Request, res: Response, next: NextFunction) {
        try {

            const result = await this.gameService.delete(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}