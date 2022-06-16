import { Request } from "express"
import { ListCostumers } from "../../useCases/ListCostumers/ListCostumersUseCase";
import { MongoCostumerRepository } from "../repositories/MongoCostumerRepository";

export const ListCostumersController = async () => {
  const listCostumersUseCase = new ListCostumers(new MongoCostumerRepository());
  return listCostumersUseCase.execute()
}