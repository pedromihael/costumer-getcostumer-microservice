import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe"
import { ICostumerRepository } from "../../controllers/repositories/ICostumerRepository";
import { MsResponseBuilder } from "../../entities/builders/MSResponseBuilder";
import { MSResponse } from "../../entities/types/MSResponse";

@autoInjectable()
export class ListCostumersUseCase {
  constructor(@inject("CostumerRepository") private costumerRepository: ICostumerRepository) {}

  async execute(): Promise<MSResponse> {
    const MSResponseData = new MsResponseBuilder().setService("Costumer").setRoute("/list-costumers")
    
      const documentResponse = await this.costumerRepository.list()
      MSResponseData.setStatus(200).setResponse(documentResponse);


    return MSResponseData.build()
  }

}