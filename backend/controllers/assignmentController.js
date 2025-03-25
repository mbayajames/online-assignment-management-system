const Assignment = require("../models/Assignment");

const createAssignment = async (req, res) => {
  const { title, description, dueDate, assignedTo } = req.body;
  const newAssignment = new Assignment({
    title,
    description,
    dueDate,
    assignedTo,
  });

  await newAssignment.save();
  res.status(201).json(newAssignment);
};

const getAssignments = async (req, res) => {
  const assignments = await Assignment.find({ assignedTo: req.user.id });
  res.status(200).json(assignments);
};

const markAsCompleted = async (req, res) => {
  const { assignmentId } = req.params;
  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }

  assignment.isCompleted = true;
  await assignment.save();
  res.status(200).json(assignment);
};

const cancelAssignment = async (req, res) => {
  const { assignmentId } = req.params;
  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }

  assignment.isCanceled = true;
  await assignment.save();
  res.status(200).json(assignment);
};

const markSubmission = async (req, res) => {
  const { assignmentId } = req.params;
  const { userId } = req.body;

  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }

  const existingSubmission = assignment.submissions.find((sub) =>
    sub.userId.equals(userId)
  );
  if (existingSubmission) {
    existingSubmission.submitted = true;
    existingSubmission.submissionDate = new Date();
  } else {
    assignment.submissions.push({
      userId,
      submitted: true,
      submissionDate: new Date(),
    });
  }

  await assignment.save();
  res
    .status(200)
    .json({ message: "Submission marked successfully", grade: "Pending" });
};

const gradeSubmission = async (req, res) => {
  const { assignmentId, userId } = req.params;
  const { grade, feedback } = req.body;

  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }

  const submission = assignment.submissions.find((sub) =>
    sub.userId.equals(userId)
  );
  if (!submission) {
    return res.status(404).json({ message: "Submission not found" });
  }

  submission.grade = grade;
  submission.feedback = feedback;
  await assignment.save();

  res
    .status(200)
    .json({ message: "Submission graded successfully", submission });
};

module.exports = {
  createAssignment,
  getAssignments,
  markAsCompleted,
  cancelAssignment,
  markSubmission,
  gradeSubmission,
};
