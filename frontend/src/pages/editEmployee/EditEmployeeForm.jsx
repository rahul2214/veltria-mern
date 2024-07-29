import { useState } from 'react';
import toast from 'react-hot-toast';

const allCourses = ['MCA', 'BCA', 'BSC']; // List of all possible courses

const EditEmployeeForm = ({ employee, onClose }) => {
    const [formData, setFormData] = useState({
        ...employee,
        course: employee.course || [] // Ensure course is initialized as an array
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'course') {
            // Handle checkbox changes for course selection
            setFormData((prevData) => {
                const selectedCourses = new Set(prevData.course);
                if (selectedCourses.has(value)) {
                    selectedCourses.delete(value); // Deselect if already selected
                } else {
                    selectedCourses.add(value); // Select if not already selected
                }
                return { ...prevData, course: Array.from(selectedCourses) };
            });
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/employee/employee/${employee._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update employee');
            }

            toast.success('Employee updated successfully');
            onClose(); // Close the form after successful update
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='p-1 h-32  flex items-center justify-center'>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Edit Employee</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='label p-2'>
                                <span className='text-black label-text'>Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                className='w-full input input-bordered h-10'
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className='label p-2'>
                                <span className='text-black label-text'>Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                className='w-full input input-bordered h-10'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className='label p-2'>
                                <span className='text-black label-text'>Mobile Number</span>
                            </label>
                            <input
                                type="text"
                                name="mobileNo"
                                className='w-full input input-bordered h-10'
                                value={formData.mobileNo}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className='label p-2'>
                                <span className='text-black label-text'>Designation</span>
                            </label>
                            <select
                                name="designation"
                                className="form-select w-full h-10 input-bordered"
                                value={formData.designation}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                        <div>
                            <label className='label p-2'>
                                <span className='text-black label-text'>Gender</span>
                            </label>
                            <div className="flex space-x-4">
                                <label className="label-text text-black">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleChange}
                                        className="radio"
                                    /> Male
                                </label>
                                <label className="label-text text-black">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={handleChange}
                                        className="radio"
                                    /> Female
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className='label p-2'>
                                <span className='text-black label-text'>Courses</span>
                            </label>
                            <div>
                                {allCourses.map((course) => (
                                    <div key={course}>
                                        <label className="label-text text-black">
                                            <input
                                                type="checkbox"
                                                name="course"
                                                className="checkbox border-slate-900"
                                                value={course}
                                                checked={formData.course.includes(course)}
                                                onChange={handleChange}
                                            /> {course}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-block btn-sm mt-2">Edit</button>
                            <button
                                type="button"
                                className="btn btn-block btn-sm mt-2 bg-red-600"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditEmployeeForm;
