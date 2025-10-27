import { partial } from "zod/v4/core/util.cjs";
import { prisma } from "../db/client";
import User from "../interfaces/user.interface";

export const getAllUsers = async (): Promise<User[]> => {
    return await prisma.user.findMany(
        {
            orderBy: { id: "asc" }
        }
    )
};

export const findUserById = async (id: number): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: { id }
    })
}

export const createUser = async (usr: Partial<User>): Promise<User> => {

    const usuario = { id: 1, ...usr } as User
    return await prisma.user.create(
        {
            data: usuario
        }
    );
}

export const updateUser = async (id: number, usr: Partial<User>): Promise<User | null> => {

    return await prisma.user.update(
        {
            where: { id },
            data: usr
        }
    );
}

export const removeUser = async (id:number): Promise<User | null> =>{

    return await prisma.user.delete(
        {
            where: {id}
        }
    )
}
