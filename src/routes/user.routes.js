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
import { verifyAdmin } from '../middlewares/verifyAdmin.js';




const router = Router()

router.get('/', getAllActiveUsers);
router.get('/bootcamps',findAllForNoAdmin );


router.get('/admin',authMiddleware,verifyAdmin, getAllUsersIncludeDeleted);
router.get('/bootcamp',authMiddleware,verifyAdmin, findAll);
router.delete('/:id',authMiddleware,verifyAdmin,permaDeletUser);

router.put('/:id',authMiddleware, updateUserById);

router.delete('/:id/',deletUserById);
router.patch('/:id',restoredUser);

router.get('/:id',authMiddleware, getUserById)


router.get('/:id/bootcamps', authMiddleware,findUserById);









export default router;