import React from 'react'
import PropTypes from 'prop-types'
import './modal.css'

export default function Modal({ modalUrl, setShowModal }) {
    return (
        <div onClick={() => { setShowModal(false) }} className="modal">
            <img src={modalUrl} alt="flickr images" />
        </div>
    )
}

Modal.propTypes = {
    modalUrl: PropTypes.string.isRequired,
    setShowModal: PropTypes.func.isRequired,
}