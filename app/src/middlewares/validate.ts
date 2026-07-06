import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';


export function validate(schema : z.ZodSchema, source = 'body') {
    return (req : Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errores = result.error.flatten().fieldErrors;
            return res.status(400).json({
                error: 'Error de validación',
                details: errores
            })
        }

        next();
    };
}