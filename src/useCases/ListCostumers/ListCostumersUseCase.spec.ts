import { Request } from 'express';
import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import { FakeCostumerRepository } from '~/controllers/repositories/FakeCostumerRepository';
import { ICostumerRepository } from '~/controllers/repositories/ICostumerRepository';
import { CostumerBuilder } from '~/entities/builders/CostumerBuilder';
import { ListCostumersUseCase } from './ListCostumersUseCase';

let costumerRepository: ICostumerRepository
let listCostumersUseCase: ListCostumersUseCase

describe('ListCostumers', () => {
  beforeEach(() => {
    costumerRepository = new FakeCostumerRepository();
    listCostumersUseCase = new ListCostumersUseCase(costumerRepository)
  })

  it('should list all costumers created', async () => {
    const costumerId1 = uuidv4()
    const costumerId2 = uuidv4()

    const costumerData1 = new CostumerBuilder(costumerId1).build()
    const costumerData2 = new CostumerBuilder(costumerId2).build()

    await costumerRepository.create({ body: costumerData1 } as Request, costumerId1)
    await costumerRepository.create({ body: costumerData2 } as Request, costumerId2)

    const result = await listCostumersUseCase.execute()

    expect(result.response).toHaveLength(2)
    expect(result.response).toEqual(expect.arrayContaining([costumerData1, costumerData2]))
  })

  it('should list no costumers if there is no data in repo', async () => {
    const costumerId1 = uuidv4()
    const costumerId2 = uuidv4()

    const costumerData1 = new CostumerBuilder(costumerId1)
    const costumerData2 = new CostumerBuilder(costumerId2)

    // above, showing that is not by building a costumer that a costumer will
    // be truly added to the repository

    const result = await listCostumersUseCase.execute()

    expect(result.response).toHaveLength(0)
    expect(result.response).not.toEqual(expect.arrayContaining([{ ...costumerData1, _id: costumerId1 }, { ...costumerData2, _id: costumerId2 }]))
  })
})