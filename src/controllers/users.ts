import express from 'express';

import {getUsers, deleteUserById, getUserById, updateUserById} from '../db/user';


export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try{
        const users = await getUsers();

        return res.status(200).json(users);
    }catch(error){
        console.error(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try{
        const {id} = req.params;

        const deletedUser = await deleteUserById(parseInt(id))

        return res.json(deletedUser)
    }catch(error){
        console.error(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try{

        const { id } = req.params;
        const {username} = req.body;

        if(!username){
            return res.sendStatus(400);
        }

        await updateUserById(Number(id), {username});

        const user = getUserById(Number(id));

        res.status(200).json(user).end();
    }catch(error){
        console.error(error);
        return res.sendStatus(400);
    }
}