import { Router, Request, Response } from 'express'
import { GetCostumerByIdController } from '../GET/GetCostumerController';
import { CreateCostumerByIdController } from '../POST/CreateCostumerRepository';

const router = Router()

router.post('/create-costumer', async (req: Request, res: Response) => {
  const response = await CreateCostumerByIdController(req)
  res.status(response.status).send(response)
})

router.get('/:id', async (req: Request, res: Response) => {
  const response = await GetCostumerByIdController(req)
  res.status(response.status).send(response)
})

router.get('/health-check', (req, res) => {
  res.status(200).send("Get Costumers is ok.")
})

export default router;