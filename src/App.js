import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import { Result } from './components/Result/Result';
import usePhotoSearch from './usePhotoSearch';
import Modal from './components/Modal/Modal';

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [modalUrl, setModalUrl] = useState("")

  const {
    photos,
    hasMore,
    loading,
    error
  } = usePhotoSearch(query, pageNumber)

  return (
    <div className="App">
      <Navbar setQuery={setQuery} query={query} setPageNumber={setPageNumber} />
      <Result photos={photos} hasMore={hasMore} loading={loading} error={error} setPageNumber={setPageNumber} setQuery={setQuery} setShowModal={setShowModal} setModalUrl={setModalUrl} />
      {showModal && <Modal modalUrl={modalUrl} setShowModal={setShowModal} />}
    </div>
  );
}

export default App;
