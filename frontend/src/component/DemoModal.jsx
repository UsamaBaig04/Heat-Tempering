import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { ApplicationList } from "../constants/ApplicationList"
import "../style/modal.css"

function DemoModal() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const onClickHandler = event => {
      const value = event.target.innerHTML;
      setSelected({ value })
      console.log(selected)
    }



  return (
    <>
      <a onClick={handleShow}> Alarm Report    </a>
      {/* <Button  onClick={handleShow} className="modal-btn">
        Data Report
      </Button> */}

      <Modal show={show} onHide={handleClose} centered >
        {/* <Modal.Header closeButton className='modal-header '>
          <Modal.Title className='modal-title'>Applications</Modal.Title>
        </Modal.Header> */}
        <Modal.Body className='modal-body '>
          <div className='modal-body-title'><code>APPLICATIONS</code></div>
          <Dropdown className='dropdown' >
            <Dropdown.Toggle variant="white" id="dropdown-basic" >
            {selected ? selected : "Choose One"}
            </Dropdown.Toggle>

            <Dropdown.Menu className='drop-menu' >
              {ApplicationList.map((items, index) => (
                <Dropdown.Item href="" key={index}  onClick={(e) => setSelected(items)}>{items}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div className='modal-footer'>
            <Button variant="secondary" onClick={handleClose} size="sm">
              Close
            </Button>
            <Button variant="primary" onClick={handleClose} size="sm">
              Submit
            </Button>
          </div>

        </Modal.Body>
        {/* <Modal.Footer className='modal-footer'>
          <Button variant="secondary" onClick={handleClose} size="sm">
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} size="sm">
            Submit
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default DemoModal;