import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';

export default class AuthController{
    private authService: AuthService;
    
    constructor(authService: AuthService){
        this.authService = authService;
    }

    async register(req : Request, res: Response, next: NextFunction) {
        try {
            const result = await this.authService.register(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async login(req : Request, res: Response, next: NextFunction) {
        try {
            const result = await this.authService.login(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

