import { Request } from "express"
import { ListCostumersUseCase } from "../../useCases/ListCostumers/ListCostumersUseCase";
import { MongoCostumerRepository } from "../repositories/MongoCostumerRepository";

export const ListCostumersController = async () => {
  const listCostumersUseCase = new ListCostumersUseCase(new MongoCostumerRepository());
  return listCostumersUseCase.execute()
}