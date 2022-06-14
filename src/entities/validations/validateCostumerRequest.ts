import { Request } from "express"

export const validateCostumerRequest = (request: any): boolean => (
  request?.body?.name &&
  request?.body?.age &&
  request?.body?.company &&
  request?.body?.email
)