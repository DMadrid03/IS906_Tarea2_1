
import { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/user.service';
import { validateUser, validateUserPartial } from '../schemas/user.schema';
import User from '../interfaces/user.interface';


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await UserService.getAllUsers());
    } catch (error) {
        next(error);
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const id: number = parseInt(req.params.id, 10);
        const user: User | null = await UserService.findUserById(id);
        res.json(user);
    } catch (error) {
        next(error)
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const { success, error, data } = validateUser(req.body);

    try {
        if (!success) {
            return res.status(400).json({ error });
        }
        else {
            const newUser: User = await UserService.createUser(data);
            res.status(201).json(newUser);
        }

    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { success, error, data } = req.body
    try {
        if (!success) {
            res.status(401).json(error.issues)
        }

        const usr: number = parseInt(req.params.id, 10)
        res.status(200).json(await UserService.updateUser(usr, data))
    } catch (error) {
        next(error);
    }
}

export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id, 10);

        if(isNaN(id)) {
            return res.status(400).json({message: 'Id no icoocito'});
        } else {
            await UserService.removeUser(id);
            res.status(204).send();
        }
    } catch (error) {
        next(error);
    }
}