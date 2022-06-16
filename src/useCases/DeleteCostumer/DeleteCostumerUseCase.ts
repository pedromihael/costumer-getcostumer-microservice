import { Request } from "express";
import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe"
import { ICostumerRepository } from "../../controllers/repositories/ICostumerRepository";
import { MsResponseBuilder } from "../../entities/builders/MSResponseBuilder";
import { MSResponse } from "../../entities/types/MSResponse";

@autoInjectable()
export class DeleteCostumerUseCase {
  private request: Request;
  
  constructor(@inject("CostumerRepository") private costumerRepository: ICostumerRepository, request: Request) {
    this.request = request;
  }

  async execute(): Promise<MSResponse> {
    const hasParameter = this.request && this.request.params.id
    const MSResponseData = new MsResponseBuilder().setService("Costumer").setRoute("/delete-costumer")
    
    if (hasParameter) {
      const documentResponse = await this.costumerRepository.remove(this.request)
      MSResponseData.setStatus(200).setResponse(documentResponse);

      if (!documentResponse) {
        MSResponseData.setStatus(404).setResponse(`Costumer with parameter id:${this.request.params.id} Not Found`);
      }

    } else MSResponseData.setStatus(422).setResponse(`Missing Parameter id on request`);

    return MSResponseData.build()
  }

}