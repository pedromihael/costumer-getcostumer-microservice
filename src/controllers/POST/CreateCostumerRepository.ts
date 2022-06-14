import { Request } from "express"
import { CreateCostumerUseCase } from "../../useCases/CreateCostumer/CreateCostumerUseCase";
import { MongoCostumerRepository } from "../repositories/MongoCostumerRepository";

export const CreateCostumerByIdController = async (request: Request) => {
  const createCostumerUseCase = new CreateCostumerUseCase(new MongoCostumerRepository(), request);
  return createCostumerUseCase.execute()
}