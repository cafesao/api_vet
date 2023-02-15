import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"

import routesClient from "./src/routes/client"
import routesAnimal from "./src/routes/animal"

const API_PORT = process.env.API_PORT

const api = express()

api.use(express.json())
api.use(cors())

api.use("/api/client", routesClient)
api.use("/api/animal", routesAnimal)

api.listen(API_PORT, () => console.log(`Server start in port: ${API_PORT}`))
