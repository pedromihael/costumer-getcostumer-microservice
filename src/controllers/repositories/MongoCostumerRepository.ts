import { Request } from "express";
import { costumerModel } from "../../entities/Costumer.entity";
import { ICostumerRepository } from "./ICostumerRepository";

export class MongoCostumerRepository implements ICostumerRepository {
  public async create(req: Request, _id: string): Promise<any> {
    return costumerModel.create({ ...req.body, _id })
  }

  public async findBy(req: Request, key: string, value: string): Promise<any> {
    return costumerModel.find({ [key]: value })
  }
}