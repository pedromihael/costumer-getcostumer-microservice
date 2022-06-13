import { Router, Request, Response } from 'express'
import { GetCostumerByIdController } from '../getControllers/GetCostumerController';

const router = Router()

router.get('/:id', async (req: Request, res: Response) => {
  const response = await GetCostumerByIdController(req)
  res.status(response.status).send(response)
})

router.get('/health-check', (req, res) => {
  res.status(200).send("Get Costumers is ok.")
})

export default router;