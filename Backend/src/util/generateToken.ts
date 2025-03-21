import jwt from "jsonwebtoken";

export const generateToken = (userId: string, name: string) => {
    return jwt.sign({ id: userId, name }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
};
