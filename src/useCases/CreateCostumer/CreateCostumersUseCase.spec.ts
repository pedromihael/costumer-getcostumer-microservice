import { Request } from 'express';
import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import { FakeCostumerRepository } from '~/controllers/repositories/FakeCostumerRepository';
import { ICostumerRepository } from '~/controllers/repositories/ICostumerRepository';
import { CostumerBuilder } from '~/entities/builders/CostumerBuilder';
import { CreateCostumerUseCase } from './CreateCostumerUseCase';

let costumerRepository: ICostumerRepository
let createCostumerUseCase: CreateCostumerUseCase

describe('CreateCostumer', () => {
  beforeEach(() => {
    costumerRepository = new FakeCostumerRepository();
  })

  it('should create a costumer', async () => {
    const costumerId = uuidv4();
    const costumerData = new CostumerBuilder(costumerId)
      .setAge(23)
      .setCompany('Pagaleve')
      .setName('Pedro Mihael')
      .setEmail('mihael@pagaleve.com.br')
      .setPhone('+55000000000')
      .setPicture('https://avatars.githubusercontent.com/u/42648914?v=4')
      .build();
  
      createCostumerUseCase = new CreateCostumerUseCase(
      costumerRepository,
      { body: costumerData } as unknown as Request
    )

    const result = await createCostumerUseCase.execute()

    expect(result.response).toEqual(costumerData)
  })
})