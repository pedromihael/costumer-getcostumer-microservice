import { Request } from 'express';
import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import { FakeCostumerRepository } from '~/controllers/repositories/FakeCostumerRepository';
import { ICostumerRepository } from '~/controllers/repositories/ICostumerRepository';
import { CostumerBuilder } from '~/entities/builders/CostumerBuilder';
import { ListCostumersUseCase } from '../ListCostumers/ListCostumersUseCase';
import { DeleteCostumerUseCase } from './DeleteCostumerUseCase';

let costumerRepository: ICostumerRepository
let deleteCostumerUseCase: DeleteCostumerUseCase
let listCostumersUseCase: ListCostumersUseCase

describe('DeleteCostumer', () => {
  beforeEach(() => {
    costumerRepository = new FakeCostumerRepository();
    listCostumersUseCase = new ListCostumersUseCase(costumerRepository);
  })

  it('should delete a costumer', async () => {
    const costumerId = uuidv4();
    const costumerData = new CostumerBuilder(costumerId).build();

    await costumerRepository.create({ body: costumerData } as Request, costumerId)

    deleteCostumerUseCase = new DeleteCostumerUseCase(
      costumerRepository,
      { params: { id: costumerId } } as unknown as Request
    )
    
    const deletion = await deleteCostumerUseCase.execute()
    const listing = await listCostumersUseCase.execute()

    expect(deletion.response).toEqual(costumerData)
    expect(listing.response).not.toEqual(expect.arrayContaining([costumerData]))
  })
})