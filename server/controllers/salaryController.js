import Salary from '../models/Salary.js';

const getSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find()
            .populate('employeeId', 'employeeId salary')
            .populate({
                path: 'employeeId',
                populate: [
                    {
                        path: 'userId',
                        select: 'name'
                    },
                    {
                        path: 'department',
                        select: 'dep_name'
                    }
                ]
            });
        return res.status(200).json({ success: true, salaries });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const addSalary = async (req, res) => {
    try {
        const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

        const netSalary = basicSalary + allowances - deductions;

        const salary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary,
            payDate
        });
        await salary.save();

        return res.status(201).json({ success: true, salary });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getSalary = async (req, res) => {
    try {
        const { id } = req.params;
        const salary = await Salary.findById(id)
            .populate('employeeId', 'employeeId salary')
            .populate({
                path: 'employeeId',
                populate: {
                    path: 'userId',
                    select: 'name'
                }
            });
        return res.status(200).json({ success: true, salary });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export { getSalaries, addSalary, getSalary };
