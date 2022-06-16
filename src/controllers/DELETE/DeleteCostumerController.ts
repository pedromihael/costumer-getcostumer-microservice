import { Request } from "express"
import { DeleteCostumerUseCase } from "../../useCases/DeleteCostumer/DeleteCostumerUseCase";
import { MongoCostumerRepository } from "../repositories/MongoCostumerRepository";

export const DeleteCostumerController = async (request: Request) => {
  const deleteCostumerUseCase = new DeleteCostumerUseCase(new MongoCostumerRepository(), request);
  return deleteCostumerUseCase.execute()
}