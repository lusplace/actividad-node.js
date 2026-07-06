
import { NextFunction, Request, Response } from 'express';
import StudioService from '../services/studioService';
import { NotFoundError } from '../errors/AppError';

export class StudioController{
    private studioService: StudioService;

    private getId(req: Request){
        const id = req.params.id as string;
        return id as unknown as number;
    }

    constructor(studioService: StudioService){
        this.studioService = studioService;
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.studioService.getAll();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req : Request, res: Response, next: NextFunction) {
        try {
            const result = await this.studioService.getById({id: this.getId(req)});
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
            const studio = await this.studioService.getById({id: this.getId(req)});
            if(!studio) throw new NotFoundError();
            const result = await this.studioService.putStudio({...req.body, id: studio.id});
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req : Request, res: Response, next: NextFunction) {
        try {
            const game = await this.studioService.getById({id: this.getId(req)});
            if(!game) throw new NotFoundError();
            const result = await this.studioService.delete({id: game.id});
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getGames(req : Request, res: Response, next: NextFunction) {
        try {
            const id = this.getId(req);
            const studio = await this.studioService.getById({id});
            const games = await this.studioService.getGames({id});
            const result = { "studioName": studio.name, "games": games};
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}