export interface UserInterface {
    id: number
    name: string
    email: string
    password: string
    phone: string
    role: 'landlord' | 'tenant'
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

export default UserInterface;