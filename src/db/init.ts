import User from "./models/user";

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => Promise.all( [
  User.sync({ alter: isDev })
])
export default dbInit 