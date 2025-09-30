import './src/config/env.js'
import express from "express"
import routes from './src/routes/index.js'
import cors from "cors"
import { connectToDataBase } from './src/config/mongodb.js'
import { boomErrorHandler, errorHandler, formErrorHandler, logErrors } from './src/middlewares/errorHandler.js'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use('/api', routes)
app.use(logErrors)
app.use(formErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)
connectToDataBase()

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})