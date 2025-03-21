import { Request, Response } from "express";

export const welcome = (req: Request, res: Response) => {
    res.send(`<h1>Welcome to our API</h1><p>Login to access your profile.</p>`);
};
