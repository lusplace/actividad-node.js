
import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import StudioService from '../services/studioService';
import GameService from '../services/gameService';

export class StudioController{
    private studioService: StudioService;

    constructor(studioService: StudioService){
        this.studioService = studioService;
    }

    async get(req : Request, res: Response, next: NextFunction) {
        try {
            const result = await this.studioService.get(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req : Request, res: Response, next: NextFunction) {
        try {
            const result = await this.studioService.get(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async create(req : Request, res: Response, next: NextFunction) {
        try {
            const result = await this.studioService.postStudio(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async update(req : Request, res: Response, next: NextFunction) {
        try {
            const result = await this.studioService.putStudio(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req : Request, res: Response, next: NextFunction) {
        try {

            const result = await this.studioService.delete(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getGames(req : Request, res: Response, next: NextFunction) {
        try {
            const result = await this.studioService.getGames(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}