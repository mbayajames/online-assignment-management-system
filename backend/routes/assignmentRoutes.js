const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    createAssignment,
    getAssignments,
    markAsCompleted,
    cancelAssignment,
    markSubmission,
    gradeSubmission,
} = require('../controllers/assignmentController');

const { validateAssignment, validateResults } = require('../utils/inputValidation');
const router = express.Router();

router.post('/', protect, authorize(['admin']), validateAssignment, validateResults, createAssignment); // Admin creates assignment
router.get('/', protect, getAssignments); // Get assignments for logged-in user
router.patch('/:assignmentId/complete', protect, authorize(['admin']), markAsCompleted); // Admin marks assignment as completed
router.patch('/:assignmentId/cancel', protect, authorize(['admin']), cancelAssignment); // Admin cancels assignment
router.patch('/:assignmentId/submit', protect, markSubmission); // Student submits an assignment
router.patch('/:assignmentId/grade/:userId', protect, authorize(['admin']), gradeSubmission); // Admin grades a submission

module.exports = router;