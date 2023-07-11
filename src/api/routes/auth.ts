import { Router, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { signup} from '../controllers/auth';
import User from '../../db/models/user';
import { CreateUserDTO, LoginUserDTO } from '../dto/user.dto';


const authRouter = Router();
const secretKey: string = process.env.SECRET_KEY as string

authRouter.post('/signup', async (req: Request, res: Response) => {
    try {
        const payload: CreateUserDTO = req.body;
        const { email, password } = payload;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(409).json({ message: 'User with this email already exists' });
            return;
        }
        payload.password = await bcrypt.hash(password, 10);
        const result = await signup(payload);
        return res.status(201).send(result);
    }
    catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'An error occurred during signup' });
    }
});

authRouter.post('/login', async(req: Request, res: Response) => {
    try {
        const payload: LoginUserDTO = req.body;
        const { email, password } = payload;
    
        const user = await User.findOne({ where: { email } });
        if (!user) {
          res.status(401).json({ message: 'Invalid email or password' });
          return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          res.status(401).json({ message: 'Invalid email or password' });
          return;
        }

        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
    
        res.status(200).json({ message: 'Login successful', token });
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login' });
      }
});

export default authRouter;