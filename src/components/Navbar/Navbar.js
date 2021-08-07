import React from 'react'

export default function Navbar({ query, setQuery, setPageNumber }) {
    function handleSearch(e) {
        setQuery(e.target.value)
        setPageNumber(1)
    }
    return (
        <div>
            <h3>Search Photos</h3>
            <div>
                <input type="text" value={query} onChange={handleSearch}></input>
            </div>
        </div>
    )
}
