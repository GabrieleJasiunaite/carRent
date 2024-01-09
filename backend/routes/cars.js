import express from 'express';
import * as controller from '../controllers/controller.js';

const router = express.Router()

router.get('/', controller.getCars);
router.get('/:id', controller.getCar);
router.put('/:id', controller.updateCar);
router.post('/', controller.createCar);
router.delete('/:id', controller.removeCar);

export default router;