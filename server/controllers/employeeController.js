import Employee from '../models/Employee.js';
import User from '../models/User.js';
import Department from '../models/Department.js';

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate('userId', 'name email')
            .populate('department', 'dep_name');
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const addEmployee = async (req, res) => {
    try {
        const { name, email, employeeId, dob, age, gender, maritalStatus, department, salary, phone, address } = req.body;
        const photo = req.file ? req.file.filename : null;

        // Create user first
        const user = new User({
            name,
            email,
            password: 'defaultpassword', // Should be changed later
            role: 'employee'
        });
        await user.save();

        // Create employee
        const employee = new Employee({
            userId: user._id,
            employeeId,
            dob,
            age,
            gender,
            maritalStatus,
            department,
            salary,
            phone,
            address,
            photo
        });
        await employee.save();

        return res.status(201).json({ success: true, employee });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id)
            .populate('userId', 'name email')
            .populate('department', 'dep_name');
        return res.status(200).json({ success: true, employee });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, employeeId, dob, gender, maritalStatus, department, salary, phone, address } = req.body;
        const photo = req.file ? req.file.filename : undefined;

        const updateData = {
            employeeId,
            dob,
            gender,
            maritalStatus,
            department,
            salary,
            phone,
            address
        };

        if (photo !== undefined) {
            updateData.photo = photo;
        }

        const employee = await Employee.findByIdAndUpdate(id, updateData, { new: true });

        if (name || email) {
            await User.findByIdAndUpdate(employee.userId, { name, email });
        }

        return res.status(200).json({ success: true, employee });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        await User.findByIdAndDelete(employee.userId);
        return res.status(200).json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export { getEmployees, addEmployee, getEmployee, updateEmployee, deleteEmployee };
