import React, { useState, useEffect, useRef } from 'react';
import Search from './Search';

const DataGrid = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCapsule, setSelectedCapsule] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const dialogRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.spacexdata.com/v3/capsules');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                setDialogOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dialogRef]);

    const handleCapsuleClick = (capsule) => {
        setSelectedCapsule(capsule);
        setDialogOpen(true);
    };

    const filteredData = data.filter((item) => {
        return (
            item.capsule_serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / dataPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mx-auto mb-10">
            <Search onSearch={setSearchTerm} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
                        onClick={() => handleCapsuleClick(item)}
                    >
                        <h3 className="text-xl font-semibold mb-2">{item.capsule_serial}</h3>
                        <p className="text-gray-600">{item.details}</p>
                    </div>
                ))}
            </div>
            {dialogOpen && selectedCapsule && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div ref={dialogRef} className="bg-white rounded-lg shadow-md p-6 w-11/12 md:w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">Capsule: {selectedCapsule.capsule_serial}</h2>
                        <p className="mb-2"><strong>Type:</strong> {selectedCapsule.type}</p>
                        <p className="mb-2"><strong>Status:</strong> {selectedCapsule.status}</p>
                        <p className="mb-2"><strong>Original Launch:</strong> {selectedCapsule.original_launch}</p>
                        <p className="mb-2"><strong>Reuse Count:</strong> {selectedCapsule.reuse_count}</p>
                        <p className="mb-2"><strong>Landings:</strong> {selectedCapsule.landings}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded
focus:outline-none"
                            onClick={() => setDialogOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="flex justify-center mt-10">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    {pageNumbers.map((number) => (
                        <a
                            key={number}
                            onClick={() => paginate(number)}
                            className={`${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'
                                } relative inline-flex items-center px-4 py-2 border border-gray-300 font-medium hover:bg-gray-50 focus:z-10 focus:outline-none`}
                        >
                            {number}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default DataGrid;
