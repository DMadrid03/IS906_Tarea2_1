import {Router} from 'express';
import * as UsersController from '../controllers/user.controller';

export const userRouter = Router();

userRouter.get('/', UsersController.getAllUsers);
userRouter.get('/:id', UsersController.getUserById);
userRouter.post('/', UsersController.createUser);
userRouter.put('/:id', UsersController.updateUser);
userRouter.delete('/:id', UsersController.removeUser);