import { Request } from "express"
import { MSResponse } from "~/entities/types/MSResponse"

export const GetCostumerByIdController = async (request: Request): Promise<MSResponse> => {
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      service: 'GetCostumer',
      route: 'get-costumer/:id',
      response: `Costumer with id: ${request.params.id} found.`
    })
  })
}