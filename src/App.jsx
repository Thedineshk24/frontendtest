import React from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import DataGrid from './components/DataGrid';
import Footer from './components/Footer';

function App() {
  const handlePageChange = (pageNumber) => {
    // Fetch new data based on the pageNumber
  };

  return (
    <div className="App">
      <Navbar />
      <Banner />
      <DataGrid />
      <Footer />
    </div>
  );
}

export default App;
