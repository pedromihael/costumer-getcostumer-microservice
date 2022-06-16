import { Request } from "express";

export interface ICostumerRepository {
  create: (req: Request, id: string) => Promise<any>
  findBy: (req: Request, key: string, value: string) => Promise<any>
  update: (req: Request) => Promise<any>
  remove?: (req: Request) => Promise<any>
  list: () => Promise<any>
}