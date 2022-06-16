import { Request } from "express"
import { UpdateCostumerUseCase } from "../../useCases/UpdateCostumer/UpdateCostumerUseCase";
import { MongoCostumerRepository } from "../repositories/MongoCostumerRepository";

export const UpdateCostumerController = async (request: Request) => {
  const updateCostumerUseCase = new UpdateCostumerUseCase(new MongoCostumerRepository(), request);
  return updateCostumerUseCase.execute()
}