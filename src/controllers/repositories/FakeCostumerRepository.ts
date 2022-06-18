import { Request } from "express";
import { ICostumerRepository } from "./ICostumerRepository";

export class FakeCostumerRepository implements ICostumerRepository {

  private mock: Array<any> = []

  private removeFromMock(id: string) {
    const removed = this.mock.find(o => o._id === id)
    this.mock = this.mock.filter(o => o._id !== removed._id)
    return removed
  }

  public async create(req: Request, _id: string): Promise<any> {
    this.mock.push({ ...req.body, _id })
    return this.mock[this.mock.length - 1]
  }

  public async findBy(key: string, value: string | number): Promise<any> {
    const filterByKey = (o: any) => {
      return key === 'phone' ?
        o[key] === value :
        JSON.stringify(o[key]).match(new RegExp("^" + JSON.stringify(value).toLowerCase(), "i"))
    }

    return this.mock.filter(filterByKey)
  }

  public async list(): Promise<any> {
    return this.mock
  }

  public async update(req: Request): Promise<any> {
    const removed = this.removeFromMock(req.params.id)
    this.mock = [...this.mock, {...removed, ...req.body}] 
    return {...removed, ...req.body}
  }

  public async remove(req: Request): Promise<any> {
    this.removeFromMock(req.params.id)
    return this.mock
  }
}