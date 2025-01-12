import express from 'express';
import {
  addField,
  updateField,
  deleteField,
  getFields,
} from '../controllers/fieldControllers.js';
import authMiddleware from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', addField);
router.get('/', getFields);
router.put('/:id', updateField);
router.delete('/:id', deleteField);

export default router;
