import Workshop from "../models/workshopModel.js";

export const workshop = async (req, res) => {
    try {
        const { name, title, agenda, hostedDate, url } = req.body;



        const newWorkshop = new Workshop({
            name, title, agenda, hostedDate, url
});


        if (newWorkshop) {
            await newWorkshop.save();
            res.status(201).json({
                _id: newWorkshop._id,
                name: newWorkshop.name,
                hostedDate: newWorkshop.hostedDate,
                title: newWorkshop.title,
                agenda: newWorkshop.agenda,
                url: newWorkshop.url,

            });
        } else {
            res.status(400).json({ error: 'Invalid Work shop data' });
        }

    } catch (error) {
        console.log("Error in Workshop controller", error.message);
        res.status(500).json({ error: error.message });
    }
    console.log("Created New Workshop ");
};
export const getAllWorkShops = async (req, res) => {
    try {
        const employees = await Workshop.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllHomeWorkShops = async (req, res) => {
    try {
        const employees = await Workshop.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteWorkShops = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the employee
        const employee = await Workshop.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({ error: 'Workshop not found' });
        }

        res.status(200).json({ message: 'Workshop deleted successfully' });
    } catch (error) {
        console.log("Error in delete work shop controller", error.message);
        res.status(500).json({ error: error.message });
    }
};
export const updateWorkShops = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find and update the employee
        const employee = await Workshop.findByIdAndUpdate(id, updateData, { new: true });

        if (!employee) {
            return res.status(404).json({ error: 'Work shop not found' });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.log("Error in update Workshop controller", error.message);
        res.status(500).json({ error: error.message });
    }
};