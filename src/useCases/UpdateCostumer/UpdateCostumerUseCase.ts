import { Request } from "express";
import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe"
import { ICostumerRepository } from "../../controllers/repositories/ICostumerRepository";
import { MsResponseBuilder } from "../../entities/builders/MSResponseBuilder";
import { MSResponse } from "../../entities/types/MSResponse";
import { validateCostumerParamName } from "../../entities/validations/validateCostumerParamName";

@autoInjectable()
export class UpdateCostumerUseCase {
  private request: Request;
  
  constructor(@inject("CostumerRepository") private costumerRepository: ICostumerRepository, request: Request) {
    this.request = request;
  }

  async execute(): Promise<MSResponse> {
    const isBodyValid = Object.keys(this.request.body).every(k => validateCostumerParamName(k))
    const hasId = this.request.params.id
    const MSResponseData = new MsResponseBuilder().setService("Costumer").setRoute("/update-costumer")

    if (hasId && isBodyValid) {
      try {
        const documentResponse = await this.costumerRepository.update(this.request)
        MSResponseData.setStatus(200).setResponse(documentResponse);
      } catch (error) {
        console.log('error', error)
      }
    } else MSResponseData.setStatus(422).setResponse("Not Updated. Check body and params");

    return MSResponseData.build()
  }

}