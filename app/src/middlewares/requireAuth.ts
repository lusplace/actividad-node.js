import { AppError } from "../errors/AppError";
import { NextFunction, Request, Response } from 'express';
import TokenService from "../services/token.service";
import TokenServiceImpl from "../services/impl/token.service.impl";

export class AuthMiddleware{

    constructor(private tokenService: TokenService) {
        this.tokenService = tokenService;
    }

    requireAuth(req: Request, res: Response, next: NextFunction) {
        const header = req.headers['authorization'];

        if(!header || !header.startsWith('Bearer ')) {
            return next(new AppError('Token no proporcionado', 401));
        }

        const token = header.split(' ')[1];

        try {
            const tokenService = this?.tokenService ?? new TokenServiceImpl(process.env.JWT_SECRET as string ,
            Number(process.env.JWT_EXPIRATION) ?? 86400);

            const payload = tokenService.verifyAccessToken(token);

            Object.assign(req,  { user: { id: payload.sub }});
            next();
        } catch (error : any) {
            if (error['name'] === 'TokenExpiredError') {
                return next(new AppError('Token expirado', 401));
            }
            return next(new AppError('Token inválido ' + error, 401));
        }
    }
}

