import { Request } from "express";
import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe"
import { validateCostumerParamName } from "../../entities/validations/validateCostumerParamName";
import { ICostumerRepository } from "../../controllers/repositories/ICostumerRepository";
import { MsResponseBuilder } from "../../entities/builders/MSResponseBuilder";
import { MSResponse } from "../../entities/types/MSResponse";

@autoInjectable()
export class GetCostumerByUseCase {
  private request: Request;
  private getByKey: string;
  private getByValue: string;
  
  constructor(@inject("CostumerRepository") private costumerRepository: ICostumerRepository, request: Request) {
    this.request = request;
    this.getByKey = this.request.params.paramname;
    this.getByValue = this.request.params.param;
  }

  async execute(): Promise<MSResponse> {
    const hasParameter = this.request && this.request.params.paramname && this.request.params.param
    const MSResponseData = new MsResponseBuilder().setService("Costumer").setRoute("/get-costumer")
    const isParamKeyValid = validateCostumerParamName(this.getByKey)
    
    if (hasParameter) {
      const documentResponse = await this.costumerRepository.findBy(this.getByKey, this.getByValue)
      MSResponseData.setStatus(200).setResponse(documentResponse);


      if (!documentResponse.length) {
        MSResponseData.setStatus(404).setResponse(`Costumer with parameter ${this.getByKey}:${this.getByValue} Not Found`);
      }

      if (!isParamKeyValid) {
        MSResponseData.setStatus(422).setResponse(`Bad Request: Parameter ${this.getByKey} not valid`);
      }

    } else MSResponseData.setStatus(422).setResponse(`Missing Parameter ${this.getByKey} on request`);

    return MSResponseData.build()
  }

}