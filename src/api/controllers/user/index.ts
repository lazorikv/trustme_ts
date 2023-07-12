import * as service from '../../../db/services/user'
import { CreateUserDTO, UpdateUserDTO } from '../../dto/user.dto'
import { UserInterface } from '../../interfaces/user.interface'
import * as mapper from '../auth/mapper'


export const update = async (id: number, payload: UpdateUserDTO): Promise<UserInterface> => {
    return mapper.toUser(await service.update(id, payload))
}

export const getById = async (id: number): Promise<UserInterface> => {
    return mapper.toUser(await service.getById(id))
}

export const deleteById = async (id: number): Promise<boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}

export const getAll = async(): Promise<UserInterface[]> => {
    return (await service.getAll()).map(mapper.toUser)
}