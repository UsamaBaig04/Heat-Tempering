import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import ModalLaf from './ModalLaf';
import {FaChartLine} from 'react-icons/fa'

const GraphModal = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <div>
                <Button className='modal-btn' variant='success' onClick={()=>setShowModal(true)}><FaChartLine/></Button>
            </div>
            {
               showModal && <ModalLaf setShowModal={setShowModal} showModal={showModal}/>
            }
        </>
    )
}

export default GraphModal
