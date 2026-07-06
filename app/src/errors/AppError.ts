export class AppError extends Error {
    status: number;
    constructor(message : string, status = 500) {
        super(message);
        this.status = status;
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Elemento no encontrado") {
        super(message, 404);
    }
}

export class EmptyDataError extends AppError {
    constructor(message = "No hay elementos disponibles") {
        super(message, 404);
    }
}