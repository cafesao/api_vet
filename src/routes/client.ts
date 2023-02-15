import { Router } from "express"
import controller from "../controller/client"

const routes = Router()

routes.post("/", controller.Create)
routes.get("/", controller.Read)
routes.patch("/", controller.Update)
routes.delete("/", controller.Delete)

export default routes
