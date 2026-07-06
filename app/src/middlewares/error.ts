import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export function errorHandler(err: HttpError, req : Request, res: Response, next: NextFunction) {
    console.error("[ERROR]", err.stack);
    
    res.status(err.status || 500).json({
        error: err.message || "Error interno del servidor"
    });
}