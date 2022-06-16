import { Router, Request, Response } from 'express'
import { CreateCostumerByIdController } from '../../POST/CreateCostumerController';

const router = Router()

router.post('/create-costumer', async (req: Request, res: Response) => {
  const response = await CreateCostumerByIdController(req)
  res.status(response.status).send(response)
})

export default router;