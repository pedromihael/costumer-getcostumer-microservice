import { Request } from "express"
import { GetCostumerByUseCase } from "../../useCases/GetCostumerBy/GetCostumerByUseCase";
import { MongoCostumerRepository } from "../repositories/MongoCostumerRepository";

export const GetCostumerByIdController = async (request: Request) => {
  const getCostumerByUseCase = new GetCostumerByUseCase(new MongoCostumerRepository(), request);
  return getCostumerByUseCase.execute()
}