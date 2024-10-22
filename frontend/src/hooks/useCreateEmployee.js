// src/hooks/useCreateEmployee.js
import { useState } from 'react';
import toast from 'react-hot-toast';

const useCreateEmployee = () => {
    const [loading, setLoading] = useState(false);

    const createEmployee = async ({ name, companyname, jobrole, noofvacancies, location, domain, jobdescription, email, mobileNo, linkedin, joburl }) => {
        const success = handleInputErrors({ name, companyname, jobrole, noofvacancies, location, domain, jobdescription, email, mobileNo, linkedin, joburl });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch('/api/employee/employee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, companyname, jobrole, noofvacancies, location, domain, jobdescription, email, mobileNo, linkedin, joburl }),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success('job created successfully!');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, createEmployee };
};

function handleInputErrors({ name, companyname, jobrole, location, domain, jobdescription}) {
    if (!name ||  !companyname || !jobrole || !location || !domain || !jobdescription ) {
        toast.error('Please fill in all fields.');
        return false;
    }
   
    return true;
}

export default useCreateEmployee;
