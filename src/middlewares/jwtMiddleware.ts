import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../consts';


export function tokenRequired(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token not provided.' });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
}