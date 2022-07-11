import express from "express";
import env from "dotenv";

// IMPORT DB CONNECTION
import mongodbConnection from "./config/db.js";

// IMPORT ALL MIDDILEARES
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import ExpressMongoSanitize from 'express-mongo-sanitize'

// IMPORTS ALL CUSTOM MIDDLEWARES
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

//IMPORT ALL ROUTES
import homeRoute from "./routes/home.route.js";
import PublicRouter from "./routes/public/index.js";
import PrivateRouter from "./routes/private/index.js";

const app = express();
env.config();



// set security HTTP headers
app.use(helmet())

app.disable('x-powered-by')
// parse urlencoded request body
app.use(express.urlencoded({ limit: '69mb' }))
app.use(express.urlencoded({extended: true})); 
// parse json request body
app.use(express.json());
app.use(ExpressMongoSanitize())

// enable cors
app.use(cors())
app.options('*', cors())

// Mongodb connection
mongodbConnection()

// Middleware
app.use(morgan('dev'))


// HOME ROUTE
app.use("/", homeRoute);

// PUBLIC ROUTE
app.use('/public', PublicRouter)
// PRIVATE ROUTE
app.use('/private', PrivateRouter)







// custom middleware
app.use(notFound)
app.use(errorHandler)

// Server Listen
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})