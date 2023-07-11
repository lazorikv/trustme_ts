import { UserOutput } from "../../../db/models/user"

export const toUser = (user: UserOutput): UserOutput => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt
    }
}

