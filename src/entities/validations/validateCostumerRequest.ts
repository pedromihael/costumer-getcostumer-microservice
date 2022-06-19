import { validateCostumerParamName } from "./validateCostumerParamName"

export const validateCostumerRequest = (request: any): boolean => (
  request?.body?.name &&
  request?.body?.age &&
  request?.body?.company &&
  request?.body?.email &&
  Object.keys(request?.body).every(k => validateCostumerParamName(k))
)