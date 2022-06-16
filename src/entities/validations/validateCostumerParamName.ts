import { CostumerDTO } from '../DTOs/CostumerDTO'

export const validateCostumerParamName = (paramName: string): boolean => {
  const headers: Array<Object> = Object.keys(CostumerDTO).map(key => key)
  return headers.some(h => h === paramName)
}