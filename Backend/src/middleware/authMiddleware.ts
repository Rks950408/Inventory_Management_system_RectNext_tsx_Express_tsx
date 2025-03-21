import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request type to include user info
interface AuthRequest extends Request {
    userId?: number;
    userName?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return; // Ensure function stops execution
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; name: string };
        req.userId = decoded.id;
        req.userName = decoded.name;

        next(); // Pass to next middleware
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" });
    }
};
