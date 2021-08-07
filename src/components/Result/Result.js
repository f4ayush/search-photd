import React, { useState, useRef, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid';
import InfiniteScroll from 'react-infinite-scroll-component';
import './result.css'


export const Result = React.memo(({ photos, hasMore, loading, error, setPageNumber, setShowModal, setModalUrl }) => {

    const showImage = (imageUrl = "") => {
        setShowModal(true)
        setModalUrl(imageUrl)
    }

    const fetchMoreData = () => {
        setPageNumber((pageNumber) => pageNumber + 1)
    }

    return (
        <div className="result-container">
            {
                photos.length <= 0 && !loading && <p>0 results found</p>
            }

            <InfiniteScroll
                style={{ width: "100%", display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}
                dataLength={photos.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {photos.map((photo, index) => {
                    let imageUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`
                    if (photos.length === index + 1) {
                        return <div key={photo} className="image-container"><img onClick={() => showImage(imageUrl)} src={imageUrl} alt="" /></div>
                    } else {
                        return <div key={uuidv4()} className="image-container"><img onClick={() => showImage(imageUrl)} src={imageUrl} alt="" /></div>
                    }
                })}
            </InfiniteScroll>
        </div>
    )
})



// 4c5fce7e2f1b1032233410afc2c2ea27 key
// ba60a23e01d27221 secret

// https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=4c5fce7e2f1b1032233410afc2c2ea27&per_page=50&page=1&format=json&nojsoncallback=1

// https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4c5fce7e2f1b1032233410afc2c2ea27&text=dog&format=json&nojsoncallback=1