import express from "express"
import {routers} from './src/routers/routers.js'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
let __dirname = path.resolve(path.dirname(''))

console.log(__dirname)
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(routers)
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
