import { Request } from "express";
import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe"
import { ICostumerRepository } from "../../controllers/repositories/ICostumerRepository";
import { MsResponseBuilder } from "../../entities/builders/MSResponseBuilder";
import { MSResponse } from "../../entities/types/MSResponse";

@autoInjectable()
export class GetCostumerByUseCase {
  private request: Request;
  private getBy: string;
  
  constructor(@inject("CostumerRepository") private costumerRepository: ICostumerRepository, request: Request, getBy: string) {
    this.request = request;
    this.getBy = getBy;
  }

  async execute(): Promise<MSResponse> {
    const hasParameter = this.request && this.request.params[this.getBy]
    const MSResponseData = new MsResponseBuilder().setService("Costumer").setRoute("/get-costumer")
    
    if (hasParameter) {
      const documentResponse = await this.costumerRepository.findBy(this.request, this.getBy)
      MSResponseData.setStatus(200).setResponse(documentResponse);
      
      if (!documentResponse) {
        MSResponseData.setStatus(404).setResponse(`Costumer with parameter ${this.getBy}:${this.request.params[this.getBy]} Not Found`);
      }
    } else MSResponseData.setStatus(422).setResponse(`Missing Parameter ${this.getBy} on request`);

    return MSResponseData.build()
  }

}