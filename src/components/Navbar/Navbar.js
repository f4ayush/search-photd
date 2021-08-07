import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'
import "./navbar.css"

export default function Navbar({ query, setQuery, setPageNumber }) {
    const [suggestions, setSuggestions] = useState(JSON.parse(localStorage.getItem("searchHistory")))
    const [isClicked, setIsClicked] = useState(false)
    const handleSearch = (e) => {
        setQuery(e.target.value)
        setPageNumber(1)
        setIsClicked(false)
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
                        {
                            suggestions.map(suggestion => {
                                return <p key={uuidv4()} onClick={() => setQuery(suggestion)}>{suggestion}</p>
                            })
                        }
                        <button onClick={() => setIsClicked(false)}>close</button>
                    </div>
                }
            </div>
        </nav>
    )
}


Navbar.propTypes = {
    query: PropTypes.string.isRequired,
    setPageNumber: PropTypes.func.isRequired,
    setQuery: PropTypes.func.isRequired,
}