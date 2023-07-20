import jwt from 'jsonwebtoken';
import User from '../../../db/models/user';


const secretKey: string = process.env.SECRET_KEY as string

async function getUser(token: string) {
  try {
    const decodedToken: any = jwt.verify(token, secretKey);
    const { id, email } = decodedToken;
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.id;
  } catch (error) {
    console.error('Error during getUser:', error);
    throw new Error('Invalid token');
  }
}

export default getUser