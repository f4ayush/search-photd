import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import './result.css'


export const Result = React.memo(({ photos, hasMore, loading, setPageNumber, setShowModal, setModalUrl }) => {

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
                photos.length <= 0 && !loading
                    ? <p>0 results found</p>
                    : <InfiniteScroll
                        style={{ width: "100%", display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}
                        dataLength={photos.length} // the length of the data array
                        next={fetchMoreData} // method to call api when needed
                        hasMore={hasMore} // determines whether to call next method
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {photos.map((photo, index) => {
                            let imageUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`
                            return <div key={uuidv4()} className="image-container"><img onClick={() => showImage(imageUrl)} src={imageUrl} alt="" /></div>
                        })}
                    </InfiniteScroll>}
        </div>
    )
})


Result.propTypes = {
    photos: PropTypes.array.isRequired,
    hasMore: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    setPageNumber: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired,
    setModalUrl: PropTypes.func.isRequired,
}