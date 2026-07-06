import { Request, Response, NextFunction } from 'express';

export function logger(req : Request, res: Response, next: NextFunction) {
    console.log(`-> ${req.method} ${req.url}`);
    const initialTime = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - initialTime;
        console.log(`<- ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
    });

    next();
}