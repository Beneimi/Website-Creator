import * as dotenv from 'dotenv'
import * as express from 'express'
import * as mongoose from 'mongoose'
import * as console from 'console'
import { userPageRoute } from './routes/userPage'
import { authRouter } from './routes/auth'
import { pagesRoute } from './routes/pages'
import { pageContentRoute } from './routes/pageContent'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'
import {ConnectionOptions} from "tls";

const app: express.Application = express()

const dotenvSuccess = dotenv.config()

mongoose.connect(process.env.DB_CONNECTION_STRING, { useUnifiedTopology: true, useNewUrlParser: true } as ConnectionOptions, () => {
  console.log('Connected to db')
})

const allowedOrigins = ['http://localhost:3000']

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  exposedHeaders: 'auth-token'
}

app.use(cors(options))
app.use(cookieParser())

app.use(express.json())

app.use('/api', authRouter)
app.use('/api/userpage', userPageRoute)
app.use('/api/pages', pagesRoute)
app.use('/api/', pageContentRoute)

app.listen(8080, () => console.log('Server running'))
