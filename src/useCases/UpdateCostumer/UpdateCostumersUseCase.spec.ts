import { Request } from 'express';
import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import { FakeCostumerRepository } from '~/controllers/repositories/FakeCostumerRepository';
import { ICostumerRepository } from '~/controllers/repositories/ICostumerRepository';
import { CostumerBuilder } from '~/entities/builders/CostumerBuilder';
import { UpdateCostumerUseCase } from './UpdateCostumerUseCase';

let costumerRepository: ICostumerRepository
let updateCostumerUseCase: UpdateCostumerUseCase

describe('UpdateCostumer', () => {
  beforeEach(() => {
    costumerRepository = new FakeCostumerRepository();
  })

  it('should update a costumer', async () => {
    const costumerId = uuidv4();
    const costumerData = new CostumerBuilder(costumerId).build();

    await costumerRepository.create({ body: costumerData } as Request, costumerId)

    updateCostumerUseCase = new UpdateCostumerUseCase(
      costumerRepository,
      { params: { id: costumerId }, body: { name: "Pedro Mihael" } } as unknown as Request
    )
    
    const update = await updateCostumerUseCase.execute()

    expect(update.response).toEqual({...costumerData, name: "Pedro Mihael"})
  })
})