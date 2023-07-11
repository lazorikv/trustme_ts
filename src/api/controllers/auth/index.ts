import { CreateUserDTO, LoginUserDTO } from '../../dto/user.dto';
import * as service from '../../../db/services/user'
import {UserInterface} from '../../interfaces/user.interface';
import * as mapper from './mapper'


export async function signup(payload: CreateUserDTO): Promise<UserInterface> {
  return mapper.toUser(await service.create(payload))
}
