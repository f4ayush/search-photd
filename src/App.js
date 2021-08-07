import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import Result from './components/Result/Result';
import usePhotoSearch from './usePhotoSearch';

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const {
    photos,
    hasMore,
    loading,
    error
  } = usePhotoSearch(query, pageNumber)
  return (
    <div className="App">
      <Navbar setQuery={setQuery} query={query} setPageNumber={setPageNumber} />
      <Result photos={photos} hasMore={hasMore} loading={loading} error={error} setPageNumber={setPageNumber} setQuery={setQuery} />
    </div>
  );
}

export default App;
