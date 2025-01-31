import {Router} from 'express';
import{ 
        getAllBootcamps,
        findById,
        addUser,
        getAllBootcampsWhithUsers,
        createBootcamp
} from '../controllers/bootcamp.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();


router.post('/adduser',authMiddleware, addUser)
router.post('/',authMiddleware,createBootcamp);

router.get('/',getAllBootcamps);
router.get('/:id',authMiddleware,findById)
router.get('/bootcamp',authMiddleware,getAllBootcampsWhithUsers)

export default router;