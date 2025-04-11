import express from 'express';
import upload from '../middleware/upload.js';
import {
  addMaterial,
  getMaterials,
  getMaterialById,
  deleteMaterial,
  updateMaterial
} from '../controllers/MaterialController.js';

const router = express.Router();

router.post('/', upload.single('image'), addMaterial);
router.get('/', getMaterials);
router.get('/:id', getMaterialById);
router.delete('/:id', deleteMaterial);
router.put('/:id', upload.single('image'), updateMaterial);

export default router;
