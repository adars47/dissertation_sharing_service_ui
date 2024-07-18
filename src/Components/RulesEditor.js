import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React,{useState,useEffect} from "react"
import CloseButton from 'react-bootstrap/CloseButton';
import ToastComponent from "../Components/ToastComponent";

export default (props) => {

    const [attributes,setAttributes] = useState(props.selectedRule?props.selectedRule.attributes??[]:[]);
    const [input,setInput] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [message,setMessage] = useState("");
    
    const showAlert = (message)=>{
        setMessage(message);
        setShowToast(true);
    }

    const formControl = (event) =>{
        event.preventDefault();
        const authority = event.target.authority.value
        let rules = props.rules.filter((value,index)=>{
            if(index==props.index)
            {
                return false;
            }
            return true;
        });
        rules.push({
            authority:authority,
            attributes:attributes
        })

        if(authority=="")
        {
            showAlert("Authority is required!");
            return;
        }

        console.log(attributes);
        if(attributes.length===0)
        {
            showAlert("Attributes is required!");
            return;
        }
        props.setRules(rules);
        setAttributes([]);
        props.setShowForm(false);
    };

    const removeAttribute = (value) =>{
        const filteredAttributes = attributes.filter((iter,index)=>{
            if(index==value.target.id)
            {
                return false;
            }
            return true;
        });
        setAttributes(filteredAttributes);
    };

    const addAttribute = (value) =>{
        let added = false;
        if(input===undefined)
        {
            showAlert("Authority is required!");
            return;
        }
        
        const name = input.target.value;
        if(name.trim()==="")
        {
            showAlert("Authority is required!");
            return;
        }
        let _attributes = attributes.filter((itel)=>{
            if(itel===name)
            {
                added = true;
            }
            return true;
        });
        if(added===false)
        {
            _attributes.push(name);
        }
        input.target.value="";
        setAttributes(_attributes);
    };

    return(
        <div className="modal show" tabIndex="-1"
        style={{ display: 'block', position: 'initial' }}>
            <Modal.Dialog>
            <Modal.Body>
                <Form onSubmit={formControl}>
                    <Form.Group className="mb-3" controlId="authority">
                        <Form.Label>Authority</Form.Label>
                        <Form.Control type="text" placeholder="https://ysj.ac.uk" defaultValue={props.selectedRule?props.selectedRule.authority??"":""} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        {attributes.map((value,index)=>{
                            return(
                                <div key={index}>
                                    {value} <CloseButton id={index} onClick={removeAttribute}/>
                                </div>
                            )
                        })}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="AddAttribute">
                        <Form.Label>Attributes</Form.Label>
                        <div style={{display:'flex'}}>
                        <Form.Control type="Attribute" onKeyUp={setInput} placeholder="Attributes" />
                        <Button className='btn btn-primary m-1' onClick={addAttribute}>+</Button>
                        </div>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Confirm
                    </Button>
                </Form>
                </Modal.Body>
            </Modal.Dialog>
            {showToast?<ToastComponent setShowToast={setShowToast} showToast={showToast} message={message}/>:""}
        </div>
    )
};