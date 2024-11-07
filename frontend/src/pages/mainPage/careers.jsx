// components/Jobs.jsx
import { useState, useMemo } from 'react';
import useFetchEmployees from '../../hooks/useFetchEmployees';
import EmployeeSearchInput from '../../components/SearchInput';
import { useNavigate } from 'react-router-dom';
import MainNavbar from "./navbar/index";
import Footer from './footer';

const Jobs = () => {
    const { jobs, totalJobs, loading, error } = useFetchEmployees();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, ] = useState("createdAt");
    const [sortOrder, ] = useState("asc");
    const [selectedDomain, setSelectedDomain] = useState("");
    const navigate = useNavigate();

    const handleJobClick = (employee) => {
        const { _id } = employee;
        const jobDetailsPath = `/job-details/${_id}`;
        navigate(jobDetailsPath);
    };

    const sortedEmployees = useMemo(() => {
        let sortedList = [...jobs];

        if (selectedDomain) {
            sortedList = sortedList.filter(employee => employee.domain === selectedDomain);
        }

        if (sortField) {
            sortedList.sort((a, b) => {
                let aValue = a[sortField];
                let bValue = b[sortField];

                if (sortField === "createdAt") {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                } else {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                return sortOrder === "asc" ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
            });
        }

        return sortedList.filter(employee =>
            employee.jobrole.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.companyname.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [jobs, sortField, sortOrder, searchTerm, selectedDomain]);

    if (loading) return <div><p className="text-black">Loading...</p></div>;
    if (error) return <div><p className="text-red-600">{error}</p></div>;

    const uniqueDomains = [...new Set(jobs.map(emp => emp.domain))];

    return (
        <div>
            <MainNavbar />
            <div className="mx-auto p-4">
                <div className="bg-gray-400 p-6 rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-0">
                    <div className="flex justify-end mb-4">
                        <EmployeeSearchInput onSearch={setSearchTerm} />
                    </div>
                    <h1 className=" text-gray-700">Total Jobs: {totalJobs}</h1>

                    <div className="flex justify-between items-center mt-4 mb-6">
                        <label className="text-gray-700">
                            Filter by Domain:
                            <select value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)} className="ml-2 p-2 bg-white border">
                                <option value="">All Domains</option>
                                {uniqueDomains.map(domain => <option key={domain} value={domain}>{domain}</option>)}
                            </select>
                        </label>
                    
                    </div>

                    {sortedEmployees.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedEmployees.map(employee => (
                                <div key={employee._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer" onClick={() => handleJobClick(employee)}>
                                    <h2 className="text-xl font-bold mb-2 text-gray-800 text-center">{employee.companyname}</h2>
                                    <p className="text-gray-600"><strong>Job Role: </strong>{employee.jobrole}</p>
                                    {/* <p className="text-gray-600"><strong>No of Vacancies: </strong>{employee.noofvacancies || "N/A"}</p> */}
                                    <p className="text-gray-600"><strong>Location: </strong>{employee.location || "N/A"}</p>
                                    {/* <p className="text-gray-600"><strong>Email: </strong><a href={`mailto:${employee.email}`} className="text-blue-500 hover:underline">{employee.email || "N/A"}</a></p> */}
                                    {/* <p className="text-gray-600"><strong>Mobile: </strong><a href={`tel:${employee.mobileNo}`} className="text-blue-500 hover:underline">{employee.mobileNo || "N/A"}</a></p> */}
                                    {/* <p className="text-gray-600"><strong>Job Description: </strong>{employee.jobdescription}</p> */}
                                    {/* <p className="text-gray-600"><strong>Job Url: </strong><a href={employee.joburl} className="text-blue-500 hover:underline">{employee.joburl || "N/A"}</a></p> */}
                                    <p className="text-gray-600 mt-2"><strong>Posted On: </strong>{new Date(employee.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-700">
                            <p>No jobs available</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Jobs;
