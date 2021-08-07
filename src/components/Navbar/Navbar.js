import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

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
        <div>
            <h3>Search Photos</h3>
            <div>
                <input type="text" value={query} onClick={showSuggestions} onChange={handleSearch}></input>
                {isClicked &&
                    <div className="suggestion-box">
                        {suggestions.map(suggestion => <p key={uuidv4()} onClick={() => setQuery(suggestion)}>{suggestion}</p>)}
                        <button onClick={() => setIsClicked(false)}>close</button>
                    </div>
                }
            </div>
        </div>
    )
}
