import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from  'dotenv'
import multer from 'multer'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app= express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}))
app.use(morgan('common'))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))