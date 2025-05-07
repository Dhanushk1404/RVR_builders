import express from 'express';
import { addProject, getProjects, deleteProject, updateProject } from '../controllers/projectController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Upload image and project data
router.post('/', upload.single('image'), addProject);
router.get('/', getProjects);
router.put('/:id',upload.single('image'),updateProject);
router.delete('/:id', deleteProject);

export default router;
