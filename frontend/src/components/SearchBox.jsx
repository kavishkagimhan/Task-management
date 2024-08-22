import React from 'react';

const SearchBox = ({ searchQuery, handleSearchChange }) => {
  return (
    <div>
      <div className='flex items-center gap-1'>
        <input 
          type="text" 
          placeholder='Search tasks...' 
          className='px-4 py-2 my-4 border border-secondary' 
          value={searchQuery} 
          onChange={(e) => handleSearchChange(e.target.value)} 
        />
        <button className='px-4 py-2 text-white bg-purple-700 border hover:bg-purple-900'>Search</button>
      </div>
    </div>
  );
};

export default SearchBox;
