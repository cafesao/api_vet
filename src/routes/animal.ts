import { Router } from "express"
import controller from "../controller/animal"

const routes = Router()

routes.post("/", controller.create)
routes.get("/:typeDoc/:numDoc", controller.read)
routes.patch("/:typeDoc/:numDoc", controller.update)
routes.delete("/:typeDoc/:numDoc", controller.delete)

export default routes
