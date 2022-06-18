import { Request } from 'express';
import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import { FakeCostumerRepository } from '~/controllers/repositories/FakeCostumerRepository';
import { ICostumerRepository } from '~/controllers/repositories/ICostumerRepository';
import { CostumerBuilder } from '~/entities/builders/CostumerBuilder';
import { CostumerDTO } from '~/entities/DTOs/CostumerDTO';
import { GetCostumerByUseCase } from './GetCostumerByUseCase';

let costumerRepository: ICostumerRepository
let getCostumerByUseCase: GetCostumerByUseCase
let costumerId: string
let costumerData: typeof CostumerDTO

describe('GetCostumerBy', () => {
  beforeEach(async () => {
    costumerRepository = new FakeCostumerRepository();
    costumerId = uuidv4();
    costumerData = new CostumerBuilder(costumerId)
      .setAge(23)
      .setCompany('Pagaleve')
      .setName('Pedro Mihael')
      .setEmail('mihael@pagaleve.com.br')
      .setPhone('+55000000000')
      .setPicture('https://avatars.githubusercontent.com/u/42648914?v=4')
      .build();
  })

  it('should get costumer by id', async () => {
    await costumerRepository.create({ body: costumerData } as Request, costumerId)
  
    getCostumerByUseCase = new GetCostumerByUseCase(
      costumerRepository,
      { params: { paramname: '_id', param: costumerId } } as unknown as Request
    )

    const result = await getCostumerByUseCase.execute()

    expect(result.response).toHaveLength(1)
    expect(result.response[0]).toHaveProperty('_id')
    expect(result.response[0]).toHaveProperty('age')
    expect(result.response[0]).toHaveProperty('name')
    expect(result.response[0]).toHaveProperty('company')
    expect(result.response[0]).toHaveProperty('email')
    expect(result.response[0]).toHaveProperty('picture')
    expect(result.response[0]).toEqual(costumerData)
  })

  it('should get costumer by name', async () => {
    const costumerId2 = uuidv4();
    const costumerData2 = new CostumerBuilder(costumerId2).setName('Pedro Mihael').build()

    await costumerRepository.create({ body: costumerData } as Request, costumerId)
    await costumerRepository.create({ body: costumerData2 } as Request, costumerId2)
  
    getCostumerByUseCase = new GetCostumerByUseCase(
      costumerRepository,
      { params: { paramname: 'name', param: 'Pedro Mihael' } } as unknown as Request
    )

    const result = await getCostumerByUseCase.execute()

    expect(result.response).toHaveLength(2)
    expect(result.response).toEqual(expect.arrayContaining([costumerData, costumerData2]))
  })

  it('should get costumer by age', async () => {
    const costumerId2 = uuidv4();
    const costumerId3 = uuidv4();
    
    const costumerData2 = new CostumerBuilder(costumerId2).setAge(23).build()
    const costumerData3 = new CostumerBuilder(costumerId3).setAge(23).build()

    const costumers = [costumerData, costumerData2, costumerData3]

    costumers.map(async c => {
      await costumerRepository.create({ body: c } as Request, c._id)
    })

    getCostumerByUseCase = new GetCostumerByUseCase(
      costumerRepository,
      { params: { paramname: 'age', param: 23 } } as unknown as Request
    )

    const result = await getCostumerByUseCase.execute()

    expect(result.response).toHaveLength(3)
    expect(result.response).toEqual(expect.arrayContaining(costumers))
  })

  it('should get costumer by company', async () => {
    const costumerId2 = uuidv4();    
    const costumerData2 = new CostumerBuilder(costumerId2).setCompany('Pagaleve').build()

    const costumers = [costumerData, costumerData2]

    costumers.map(async c => {
      await costumerRepository.create({ body: c } as Request, c._id)
    })

    getCostumerByUseCase = new GetCostumerByUseCase(
      costumerRepository,
      { params: { paramname: 'company', param: 'pagaleve' } } as unknown as Request
    )

    const result = await getCostumerByUseCase.execute()

    expect(result.response).toHaveLength(2)
    expect(result.response).toEqual(expect.arrayContaining(costumers))
  })

  it('should get costumer by email', async () => {
    const costumerId2 = uuidv4();    
    const costumerData2 = new CostumerBuilder(costumerId2).setEmail('mihael@pagaleve.com.br').build()

    const costumers = [costumerData, costumerData2]

    costumers.map(async c => {
      await costumerRepository.create({ body: c } as Request, c._id)
    })

    getCostumerByUseCase = new GetCostumerByUseCase(
      costumerRepository,
      { params: { paramname: 'email', param: 'mihael@pagaleve.com.br' } } as unknown as Request
    )

    const result = await getCostumerByUseCase.execute()

    expect(result.response).toHaveLength(2)
    expect(result.response).toEqual(expect.arrayContaining(costumers))
  })

  it('should get costumer by phone', async () => {
    const costumerId2 = uuidv4();    
    const costumerData2 = new CostumerBuilder(costumerId2).setPhone('+55000000000').build()

    const costumers = [costumerData, costumerData2]

    costumers.map(async c => {
      await costumerRepository.create({ body: c } as Request, c._id)
    })

    getCostumerByUseCase = new GetCostumerByUseCase(
      costumerRepository,
      { params: { paramname: 'phone', param: '+55000000000' } } as unknown as Request
    )

    const result = await getCostumerByUseCase.execute()

    expect(result.response).toHaveLength(2)
    expect(result.response).toEqual(expect.arrayContaining(costumers))
  })
})