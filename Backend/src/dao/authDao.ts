import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (name: string, email: string, hashedPassword: string) => {
    return await prisma.user.create({
        data: { name, email, password: hashedPassword },
    });
};

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
};

export const findUserById = async (id: string) => {
    return await prisma.user.findUnique({ where: { id } });

};

