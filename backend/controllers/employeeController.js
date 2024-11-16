import Job from "../models/employeeModel.js";

export const employee = async (req, res) => {
    try {
        const { companyname, jobrole, noofvacancies, location, domain, jobdescription, email, mobileNo, linkedin, joburl,jobtype } = req.body;

        

        const newJob = new Job({
            companyname, jobrole, noofvacancies, location, domain, jobdescription, email, mobileNo, linkedin, joburl, jobtype
        });


        if (newJob) {
            await newJob.save();
            res.status(201).json({
                _id: newJob._id,
                
                mobileNo: newJob.mobileNo,
                email: newJob.email,
                companyname: newJob.companyname,
                jobrole: newJob.jobrole,
                noofvacancies: newJob.noofvacancies,
                location: newJob.location,
                domain: newJob.domain,
                jobdescription: newJob.jobdescription,
                linkedin: newJob.linkedin,
                joburl: newJob.joburl,
                jobtype: newJob.jobtype,


            });
        } else {
            res.status(400).json({ error: 'Invalid job data' });
        }

    } catch (error) {
        console.log("Error in job controller", error.message);
        res.status(500).json({ error: error.message });
    }
    console.log("Created New job ");
};
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Job.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const employees = await Job.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const getJobDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        res.status(200).json({ success: true, data: job });
    } catch (error) {
        console.log("Error in getJobDetails controller", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the employee
        const employee = await Job.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.log("Error in delete Job controller", error.message);
        res.status(500).json({ error: error.message });
    }
};
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find and update the employee
        const employee = await Job.findByIdAndUpdate(id, updateData, { new: true });

        if (!employee) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.log("Error in update job controller", error.message);
        res.status(500).json({ error: error.message });
    }
};