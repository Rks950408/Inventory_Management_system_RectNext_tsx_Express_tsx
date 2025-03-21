import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../dao/authDao";
// import { generateToken } from "../util/generateToken";
import jwt from "jsonwebtoken";

// Extend Express Request type inline
interface AuthRequest extends Request {
    userId?: string;
    userName?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Generate JWT Token
const generateToken = (id: string, name: string) => {
    return jwt.sign({ id, name }, JWT_SECRET, { expiresIn: "1h" });
};

// User Registration
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashedPassword);

        res.status(201).json({ 
            message: "User registered successfully", 
            user: { id: newUser.id, email: newUser.email } 
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// User Login
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const token = generateToken(user.id, user.name);
        res.json({ token, name: user.name });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const logout = async (req: Request, res: Response) => {
    res.json({ message: "Logout successful" });
};

export const getProfile = async (req: AuthRequest, res: Response) => {
    res.json({ message: `Welcome ${req.userName}`, userId: req.userId });
};
