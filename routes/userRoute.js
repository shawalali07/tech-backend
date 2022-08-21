import { Router } from 'express'
import { registerUser } from '../controllers/usersController.js'

const router = Router();
router.route('/').post(registerUser);

export default router;
