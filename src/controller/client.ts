import { Client, Andress, Animal, Problem } from "@prisma/client"
import { Request, Response } from "express"

import connectDB from "../db/connect"

const controller = {
  Create: async (req: Request, res: Response) => {
    const body = req.body
    try {
      const db = await connectDB()
      const response = await db.client.create({
        data: body
      })
      res.sendStatus(201)
    } catch (error: any) {
      console.log(error)
      return res.sendStatus(500)
    }
  },
  Read: async (req: Request, res: Response) => {
    const id = Number(req.query.id)
    const doc = Number(req.query.doc)

    try {
      let response:
        | (Client & {
            andress: Andress | null
            animal: (Animal & { problem: Problem | null })[]
          })
        | null
      const db = await connectDB()
      if (id) {
        response = await db.client.findFirst({
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
      } else {
        response = await db.client.findFirst({
          where: {
            document: doc
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
      }

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
    const doc = Number(req.query.doc)

    try {
      let response: Client & {
        andress: Andress | null
        animal: (Animal & { problem: Problem | null })[]
      }
      const db = await connectDB()
      if (id) {
        response = await db.client.update({
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
      } else {
        response = await db.client.update({
          data: body,
          where: {
            document: doc
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
      }

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
    const doc = Number(req.query.doc)

    try {
      const db = await connectDB()
      if (id) {
        await db.client.delete({
          where: {
            id
          }
        })
      } else {
        await db.client.delete({
          where: {
            document: doc
          }
        })
      }

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
