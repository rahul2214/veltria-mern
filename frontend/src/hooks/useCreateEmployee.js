// src/hooks/useCreateEmployee.js
import { useState } from 'react';
import toast from 'react-hot-toast';

const useCreateEmployee = () => {
    const [loading, setLoading] = useState(false);

    const createEmployee = async ({ name, email, mobileNo, gender, designation, course }) => {
        const success = handleInputErrors({ name, email, mobileNo, gender, designation, course });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch('/api/employee/employee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, mobileNo, gender, designation, course }),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success('Employee created successfully!');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, createEmployee };
};

function handleInputErrors({ name, email, mobileNo, gender, designation, course }) {
    if (!name || !email || !mobileNo || !gender || !designation || !course) {
        toast.error('Please fill in all fields.');
        return false;
    }
    if (mobileNo.length !== 10) {
        toast.error('Mobile number must be exactly 10 characters.');
        return false;
    }
    return true;
}

export default useCreateEmployee;
