import express, { Application, Request, Response } from 'express'
import dbInit from './src/db/init';
import routes from './src/api/routes';
import { hostname } from 'os';


dbInit()

const port = 8000
const cors = require('cors')

export const get = () => {
    const app: Application = express()


    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api/v1', routes)
    
    app.get('/', async(req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({ message: `Welcome to the Homie API! \n Endpoints available at http://localhost:${port}/api/v1` })
    })

    return app
}

export const start = () => {
    const app = get()
    try {
        app.listen(port, () => {
            console.log(`Server running on http://0.0.0.0:${port}`)
        })
    } catch (error: any) {
        console.log(`Error occurred: ${error.message}`)
    }
}

start()