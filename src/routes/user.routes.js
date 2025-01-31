import {Router} from 'express';

import {     
            deletUserById, 
            getAllActiveUsers, 
            getAllUsersIncludeDeleted,
            permaDeletUser,
            restoredUser,
            updateUserById, 
            findUserById,
            findAll,
            findAllForNoAdmin,
            getUserById
} from "../controllers/user.controller.js";
import { authMiddleware } from '../middlewares/authMiddleware.js';




const router = Router()

router.get('/:id',authMiddleware, getUserById)

router.get('/', getAllActiveUsers);
router.get('/:id/bootcamps', findUserById);
router.get('/bootcamps',findAllForNoAdmin );

router.put('/:id',authMiddleware, updateUserById);
router.delete('/:id',deletUserById);
router.patch('/:id',restoredUser);

router.get('/admin',authMiddleware, getAllUsersIncludeDeleted);
router.get('/bootcamp',authMiddleware, findAll);
router.delete('/:id',authMiddleware,permaDeletUser)

export default router;