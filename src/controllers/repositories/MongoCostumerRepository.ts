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

  public async list(): Promise<any> {
    return costumerModel.find()
  }

  public async update(req: Request): Promise<any> {
    const filter = { _id: req.params.id }
    const payload = { ...req.body }
    return costumerModel.findOneAndUpdate(filter, payload)
  }
}