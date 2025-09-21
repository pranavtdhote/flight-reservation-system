import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        let errorMessage = 'Unknown error';
        if (error instanceof Error) errorMessage = error.message;
        res.status(400).json({ message: 'Error creating user', error: errorMessage });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};