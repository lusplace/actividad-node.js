import { AppError } from "../errors/AppError";
import { NextFunction, Request, Response } from 'express';
import TokenService from "../services/token.service";

export class AuthMiddleware{

    constructor(private tokenService: TokenService) {
        this.tokenService = tokenService;
    }

    requireAuth(req: Request, res: Response, next: NextFunction) {
    console.log('requireAuth middleware called');
    const header = req.headers['authorization'];

    if(!header || !header.startsWith('Bearer ')) {
        return next(new AppError('Token no proporcionado', 401));
    }

    const token = header.split(' ')[1];

    try {
        const payload = this.tokenService.verifyAccessToken(token);

        Object.assign(req,  {user: { id: payload.sub }});
        next();
    } catch (error : any) {
        if (error['name'] === 'TokenExpiredError') {
            return next(new AppError('Token expirado', 401));
        }
        return next(new AppError('Token inválido', 401));
    }
}
}

