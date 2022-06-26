import { Request } from "express";
import { costumerModel } from "../../entities/Costumer.entity";
import { ICostumerRepository } from "./ICostumerRepository";

export class MongoCostumerRepository implements ICostumerRepository {
  public async create(req: Request, _id: string): Promise<any> {
    let randomPicture = ''
    if (!req.body.picture) {
      randomPicture = this.getRandomLego()
    }
    return costumerModel.create({ ...req.body, _id, picture: randomPicture })
  }

  public async findBy(key: string, value: string | number): Promise<any> {
    const valueToSearch = typeof value === 'string' && key !== 'phone' ?
      { $regex: new RegExp("^" + value.toLowerCase(), "i") } : value
        
    return costumerModel.find({ [key]: valueToSearch })
  }

  public async list(): Promise<any> {
    return costumerModel.find()
  }

  public async update(req: Request): Promise<any> {
    const filter = { _id: req.params.id }
    const payload = { ...req.body }
    return costumerModel.findOneAndUpdate(filter, payload)
  }

  public async remove(req: Request): Promise<any> {
    return costumerModel.findOneAndDelete({ _id: req.params.id })
  }

  private getRandomLego(): string  {
    const random = Math.ceil(Math.random() * 9)
    return `https://randomuser.me/api/portraits/lego/${random}.jpg`
  }
}