// src/hooks/useCreateEmployee.js
import { useState } from 'react';
import toast from 'react-hot-toast';

const useCreateWorkShop = () => {
    const [loading, setLoading] = useState(false);

    const createWorkShop = async ({ name, title, agenda, hostedDate, url }) => {
        const success = handleInputErrors({ name, title, agenda, hostedDate, url });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch('/api/workshop/workshop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, title, agenda, hostedDate, url }),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success('work shop created successfully!');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, createWorkShop };
};

function handleInputErrors({ name, title, agenda, hostedDate, url }) {
    if (!name || !title || !agenda || !hostedDate || !url) {
        toast.error('Please fill in all fields.');
        return false;
    }

    return true;
}

export default useCreateWorkShop;
