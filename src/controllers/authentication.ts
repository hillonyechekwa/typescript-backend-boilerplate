import express from 'express';
import { createUser, getUserByEmail, createAuth, updateAuthByUserId } from '../db/user';
import { random, authentication } from '../helpers';


export const register = async (req: express.Request, res: express.Response) => {
    try{
        const {email, password, username} = req.body;

        if(!email || !password || !username){
            return res.sendStatus(400);
        }

        //check if user already exists
        const exisitingUser = await getUserByEmail(email);


        if(exisitingUser) {
            return res.sendStatus(400);
        }

        const salt = random();

        const user = await createUser({
            email,
            username,
            password: authentication(salt, password),
            salt
        })

        if(user){
            const auth = await createAuth({
                sessionToken: "",
                userId: user.id
            })
        }


        return res.status(200).json(user).end()
    }catch(error){
        console.error(error);
        res.sendStatus(400);
    }
}



export const login = async (req: express.Request, res: express.Response) => {
  try {

    const {email, password} = req.body;
        
    if(!email || !password){
        return res.sendStatus(400);
    }

    const user = await getUserByEmail(email);

    if(!user){
        return res.sendStatus(400);//nothing to login to
    }
    
    const expectedHash = authentication(user.salt, password);

    if(user.password !== expectedHash){
        return res.sendStatus(403);
    }

    const salt = random();

    const sessionToken = authentication(salt, user.id.toString());
    // console.log(sessionToken);
    //create a new auth record
    await updateAuthByUserId(user.id, {sessionToken: sessionToken});

    res.cookie('HILLZ-AUTH', sessionToken, {domain: 'localhost', path: '/'});

    return res.status(200).json(user).end();
    
    
  } catch(error) {
    console.error(error);
    res.sendStatus(400);
  }
}  
