import Employee from "../models/employeeModel.js";

export const employee = async (req, res) => {
    try {
        const { name, email, mobileNo, gender, designation, course } = req.body;
        
        const Email = await Employee.findOne({ email });
        if (Email) {
            return res.status(400).json({ error: 'Email already exists' });
        }
       
        const newEmployee = new Employee({
            name,
            email,
            mobileNo,
            gender,
            designation,
            course
        });


        if (newEmployee) {
            await newEmployee.save();
            res.status(201).json({
                _id: newEmployee._id,
                name: newEmployee.name,
                mobileNo:newEmployee.mobileNo,
                email: newEmployee.email,
                gender: newEmployee.gender,
                designation:newEmployee.designation,
                course: newEmployee.course,
            });
        } else {
            res.status(400).json({ error: 'Invalid employee data' });
        }

    } catch (error) {
        console.log("Error in employee controller", error.message);
        res.status(500).json({ error: error.message });
    }
    console.log("Created New employee ");
};
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the employee
        const employee = await Employee.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.log("Error in delete employee controller", error.message);
        res.status(500).json({ error: error.message });
    }
};
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find and update the employee
        const employee = await Employee.findByIdAndUpdate(id, updateData, { new: true });

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.log("Error in update employee controller", error.message);
        res.status(500).json({ error: error.message });
    }
};