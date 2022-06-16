import { Router, Request, Response } from 'express'
import { DeleteCostumerController } from '../../DELETE/DeleteCostumerController';

const router = Router()

router.delete('/delete-costumer/:id', async (req: Request, res: Response) => {
  const response = await DeleteCostumerController(req)
  res.status(response.status).send(response)
})

export default router;