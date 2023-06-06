import { Request, Response } from "express"

import connectDB from "../db/connect"

const controller = {
  Create: async (req: Request, res: Response) => {
    const body = req.body
    try {
      const db = await connectDB()
      await db.animal.create({
        data: body
      })
      res.sendStatus(201)
    } catch (error: any) {
      if (error.code === "P2003") {
        return res.status(404).json({ error: "Not found clientId" })
      }
      if (error.code === "P2011") {
        return res.status(400).json({ error: "Required clientId" })
      }
      console.log(error)
      return res.sendStatus(500)
    }
  },
  Read: async (req: Request, res: Response) => {
    const id = Number(req.query.id)
    try {
      const db = await connectDB()

      const response = await db.animal.findFirst({
        where: {
          id
        },
        include: {
          client: {
            include: {
              andress: true
            }
          },
          problem: true
        }
      })
      if (response === null) {
        return res.sendStatus(404)
      }
      return res.json(response).send()
    } catch (error: any) {
      console.log(error)
      return res.sendStatus(500)
    }
  },
  Update: async (req: Request, res: Response) => {
    const body = req.body
    const id = Number(req.query.id)

    try {
      const db = await connectDB()

      const response = await db.client.update({
        data: body,
        where: {
          id
        },
        include: {
          andress: true,
          animal: {
            include: {
              problem: true
            }
          }
        }
      })
      return res.json(response).send()
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.sendStatus(404)
      } else {
        console.log(error)
        return res.sendStatus(500)
      }
    }
  },
  Delete: async (req: Request, res: Response) => {
    const id = Number(req.query.id)

    try {
      const db = await connectDB()

      await db.client.delete({
        where: {
          id
        }
      })

      return res.sendStatus(200)
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.sendStatus(404)
      } else {
        console.log(error)
        return res.sendStatus(500)
      }
    }
  }
}

export default controller
