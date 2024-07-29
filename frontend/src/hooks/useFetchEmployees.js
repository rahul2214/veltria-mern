import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useFetchEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('/api/employee/employees');
            const data = await response.json();
            setEmployees(data);
            setTotalEmployees(data.length);
        } catch (error) {
            toast.error('Error fetching employees');
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const deleteEmployee = async (id) => {
        try {
            await fetch(`/api/employee/employee/${id}`, {
                method: 'DELETE',
            });
            setEmployees((prevEmployees) => prevEmployees.filter(employee => employee._id !== id));
            setTotalEmployees(prevTotal => prevTotal - 1);
            toast.success('Employee deleted successfully');
        } catch (error) {
            toast.error('Error deleting employee');
            console.error('Error deleting employee:', error);
        }
    };

    return { employees, totalEmployees, loading, deleteEmployee, fetchEmployees };
};

export default useFetchEmployees;
