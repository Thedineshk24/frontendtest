import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    onSearch(searchInput);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="container mx-auto my-10">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-5">Search Capsules</h2>
      </div>
      <div className="flex items-center justify-center">
        <input
          className="w-full max-w-md px-4 py-2 mr-2 bg-gray-100 border border-gray-300 rounded-md"
          type="text"
          placeholder="Search by name, status, or type"
          value={searchInput}
          onChange={handleInputChange}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
