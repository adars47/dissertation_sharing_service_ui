import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';
import ToastContainer from 'react-bootstrap/ToastContainer'

export default (props)=>{
    return (
      <Row>
        <ToastContainer className="toast-container p-1" position="top-end" xs={6}>
          <Toast bg="warning"  onClose={() => props.setShowToast(false)} show={props.showToast} delay={3000} autohide>
            <Toast.Body>{props.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Row>
    );
  
    
};