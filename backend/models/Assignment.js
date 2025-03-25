const mongoose = require("mongoose");

const submissionSchema =  new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    submitted: { type: Boolean, default: false },
    grade: {type: String, default: 'Pending' },
    feedback: { type: String },
});

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueData: { type: Date, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    submissions: [submissionSchema],
    isCompleted: { type: Boolean, default: false },
    isCanceled: { type: Boolean, default: false },
});

module.exports = mongoose.model('Assignment', assignmentSchema);