import { Request } from "express";
import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe"
import { ICostumerRepository } from "../../controllers/repositories/ICostumerRepository";
import { MsResponseBuilder } from "../../entities/builders/MSResponseBuilder";
import { validateCostumerRequest } from "../../entities/validations/validateCostumerRequest";
import { v4 as uuidv4 } from "uuid";
import { MSResponse } from "../../entities/types/MSResponse";

@autoInjectable()
export class CreateCostumerUseCase {
  private request: Request;
  
  constructor(@inject("CostumerRepository") private costumerRepository: ICostumerRepository, request: Request) {
    this.request = request;
  }

  async execute(): Promise<MSResponse> {
    const isBodyValid = validateCostumerRequest(this.request)
    const MSResponseData = new MsResponseBuilder().setService("Costumer").setRoute("/create-costumer")
    if (isBodyValid) {
      const id = uuidv4()
      try {
        const documentResponse = await this.costumerRepository.create(this.request, id)
        console.log("documentResponse")
        MSResponseData.setStatus(201).setResponse(documentResponse);
      } catch (error) {
        console.log('error', error)
      }
    } else MSResponseData.setStatus(422).setResponse("Not Created. Unprocessable Entity");

    return MSResponseData.build()
  }

}