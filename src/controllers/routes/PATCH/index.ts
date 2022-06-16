import { Router, Request, Response } from 'express'
import { UpdateCostumerController } from '../../PATCH/UpdateCostumerController';

const router = Router()

router.patch('/update-costumer/:id', async (req: Request, res: Response) => {
  const response = await UpdateCostumerController(req)
  res.status(response.status).send(response)
})

export default router;