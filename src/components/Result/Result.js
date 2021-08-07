import React, { useState, useRef, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './result.css'


export const Result = React.memo(({ photos, hasMore, loading, error, setPageNumber, setShowModal, setModalUrl }) => {

    const observer = useRef()
    const lastBookElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])


    const showImage = (imageUrl = "") => {
        setShowModal(true)
        setModalUrl(imageUrl)
    }

    return (
        <>
            {
                photos.length <= 0 && !loading && <p>0 results found</p>
            }
            {photos.map((photo, index) => {
                let imageUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`
                if (photos.length === index + 1) {
                    return <div ref={lastBookElementRef} key={photo}><img onClick={() => showImage(imageUrl)} src={imageUrl} alt="" /></div>
                } else {
                    return <div key={uuidv4()}><img onClick={() => showImage(imageUrl)} src={imageUrl} alt="" /></div>
                }
            })}
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error'}</div>

        </>
    )
})



// 4c5fce7e2f1b1032233410afc2c2ea27 key
// ba60a23e01d27221 secret

// https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=4c5fce7e2f1b1032233410afc2c2ea27&per_page=50&page=1&format=json&nojsoncallback=1

// https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4c5fce7e2f1b1032233410afc2c2ea27&text=dog&format=json&nojsoncallback=1