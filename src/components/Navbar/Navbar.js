import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import "./navbar.css"

export default function Navbar({ query, setQuery, setPageNumber }) {
    const [suggestions, setSuggestions] = useState(JSON.parse(localStorage.getItem("searchHistory")))
    const [isClicked, setIsClicked] = useState(false)
    const handleSearch = (e) => {
        setQuery(e.target.value)
        setPageNumber(1)
    }

    const showSuggestions = () => {
        if (suggestions !== null) setIsClicked(true)
    }
    return (
        <nav className="navbar">
            <h3>Search Photos</h3>
            <div>
                <input type="text" placeholder="Enter keyword to search" value={query} onClick={showSuggestions} onChange={handleSearch}></input>
                {isClicked &&
                    <div className="suggestion-box" onClick={() => setIsClicked(false)}>
                        {suggestions.map(suggestion => <p key={uuidv4()} onClick={() => setQuery(suggestion)}>{suggestion}</p>)}
                        <button onClick={() => setIsClicked(false)}>close</button>
                    </div>
                }
            </div>
        </nav>
    )
}
