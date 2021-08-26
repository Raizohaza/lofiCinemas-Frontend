import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function AlertBT(alertInfo){
    const defaultData = {
        notification:"This is an info alert — check it out!"
    }
    let data = {
        notification:"This is an info alert — check it out!"
    };
    if(Object.keys(alertInfo.data).length <= 0){
        data = defaultData;
    }
    else
    {
        data = alertInfo.data;
    }
    useEffect(()=>{
        if(alertInfo.data && alertInfo.data.show === true)
            setShow(true);
    },[alertInfo.data])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {data.notification}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>Okay</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }