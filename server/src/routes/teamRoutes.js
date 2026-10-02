import { Router } from 'express';
import {
  listTeam, createTeamMember, updateTeamMember, deleteTeamMember,
} from '../controllers/teamController.js';
import { protect, requireRole } from '../middleware/auth.js';
import { teamRules } from '../validators/teamValidators.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/', listTeam);
router.post('/', protect, teamRules, validate, createTeamMember);
router.put('/:id', protect, teamRules, validate, updateTeamMember);
router.delete('/:id', protect, requireRole('admin'), deleteTeamMember);

export default router;