import express from 'express';
import {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  getResourceAvailability,
} from '../controllers/resourceController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public Read Endpoints
router.get('/', getResources);
router.get('/:id', getResourceById);
router.get('/:id/availability', getResourceAvailability);

// Admin-Only Mutation Endpoints
router.post('/', authMiddleware, requireRole('ADMIN'), createResource);
router.patch('/:id', authMiddleware, requireRole('ADMIN'), updateResource);
router.delete('/:id', authMiddleware, requireRole('ADMIN'), deleteResource);

export default router;
