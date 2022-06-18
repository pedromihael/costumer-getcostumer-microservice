import { Request } from "express";

export interface ICostumerRepository {
  create: (req: Request, id: string) => Promise<any>
  findBy: (key: string, value: string | number) => Promise<any>
  update: (req: Request) => Promise<any>
  remove: (req: Request) => Promise<any>
  list: () => Promise<any>
}