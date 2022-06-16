import { Request } from "express"
import { GetCostumerByIdUseCase } from "../../useCases/GetCostumerById/GetCostumerByIdUseCase";
import { MongoCostumerRepository } from "../repositories/MongoCostumerRepository";

export const GetCostumerByIdController = async (request: Request) => {
  const getCostumerByIdUseCase = new GetCostumerByIdUseCase(new MongoCostumerRepository(), request);
  return getCostumerByIdUseCase.execute()
}