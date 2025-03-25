const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role});
    await user.save();
    res.status(201).json(user);
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.sendStatus(401);
    }

    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn '30min' });
    res.json({ token, role: user.role });
};

const registerStudent = async (req, res) => {
    const { username, password, role } = req.body; // Accept role parameter
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new User({ username, password: hashedPassword, role: role || 'student' }); // Default to student
    await student.save();
    res.status(201).json(student);
};

module.exports = { registerUser, loginUser, registerStudent };