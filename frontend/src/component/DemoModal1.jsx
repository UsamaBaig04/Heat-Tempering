import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from "react-router-dom";
import { ApplicationList } from "../constants/ApplicationList"
import "../style/modal.css";
import {reportTypes} from "../constants/ReportTypes"

function DemoModal({show, handleClose}) {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState()
  // const [show, setShow] = useState(false);

  let isDisabled = true;
  if(selected){
    isDisabled = false
  }

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);



  return (
    <>
      {/* <a onClick={handleShow}></a> */}

      <Modal show={show} onHide={handleClose} centered >

        <Modal.Body className='modal-body '>

          <div className='modal-body-title'><code>APPLICATIONS</code></div>

          <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) =>
              setIsActive(!isActive)}>
              {selected ? selected : "Choose Application"}
              {/* <span className="fa fa-caret-down"></span>   Need CDN of fontawesome */}
            </div>
            {isActive && (
              <div className="dropdown-content">
                {
                  ApplicationList.map((Option) => {
                    return (
                      <div className="dropdown-item" onClick={(e) => setSelected(Option)}>{Option}</div>
                    )
                  })
                }
              </div>
            )}
          </div>

          <div className='modal-footer'>
            <Button variant="secondary" onClick={handleClose} size="sm">
              Close
            </Button>
            <Button variant="primary"  disabled={isDisabled} onClick={handleClose} size="sm">
              <NavLink to={"/user"} style={{color:"white", textDecoration:"none"}}>Submit</NavLink>
            </Button>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
}

export default DemoModal;