import React from 'react'
import './modal.css'

export default function Modal({ modalUrl, setShowModal }) {
    return (
        <div onClick={() => { setShowModal(false) }} className="modal">

            <img src={modalUrl} alt="" />

        </div>
    )
}
