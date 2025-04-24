import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Not authorized, no token' });
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};