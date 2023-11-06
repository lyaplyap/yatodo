import { Request, Response, NextFunction } from 'express';

export const errorHandler = (error: Error, request: Request, response: Response, _: NextFunction) => {
    response.status(500).json({
        code: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'Something went wrong, please try again',
        stack: process.env.NODE_ENV === 'development' ? error.stack : {}
    })
};
