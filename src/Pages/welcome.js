import React,{useState,useEffect} from "react"
import RulesViewer from "../Components/RulesViewer";
import RulesEditor from "../Components/RulesEditor";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import ToastComponent from "../Components/ToastComponent";
import FileUploadComponent from "../Components/FileUploadComponent";

export default (props) => {

    const [rules,setRules] = useState([]);
    const [expiresAt,setExpiresAt] = useState(null);
    const [showForm,setShowForm] = useState(false);
    const [selectedRule,setSelectRule] = useState(null);
    const [selectedIndex,setSelectedIndex] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [message,setMessage] = useState("");
    const [uploadId, setUploadId] = useState(17);

    const showAlert = (message)=>{
        setMessage(message);
        setShowToast(true);
    }

    const submitRules = async() =>{

        if(rules.length===0 || expiresAt === null)
        {
            showAlert("Rules and expires at is required");
            return ;
        }

        const payload = {
            rules:rules,
            expires_at:expiresAt
        }

       await fetch("http://127.0.0.1:8000/api/submitRules",{
            method: "POST",
            body: JSON.stringify(payload)
        }).then(async function(response){
            let message = await response.text();
            setUploadId(message);
        });

    }

    const edit = (event)=>{
        setSelectRule(rules.at(event.target.id));
        setShowForm(true);
        setSelectedIndex(event.target.id);
    };

    const add = (event)=>{
        setSelectRule(null);
        setSelectedIndex(-1);
        setShowForm(true);
    }

    const setExpiryDate = (event)=>{
        setExpiresAt(event.target.value);
    }

    if(uploadId===0)
    {
        return (
            <div className="container">
                {showForm?<RulesEditor selectedRule={selectedRule} setShowForm={setShowForm} rules={rules} index={selectedIndex} setRules={setRules}/>:""}
                <h3>Create rules to verify access</h3>
                <div>
                <Form>
                    <Form.Group className="mb-3" controlId="expiredAt">
                        <Form.Label>Expires At</Form.Label>
                        <Form.Control type="datetime-local" onChange={setExpiryDate} />
                    </Form.Group>
                </Form>
                    <div className="container-sm p-1">
                        Create Rule <Button onClick={add}>+</Button>
                    </div>
                    {rules.map((value,index)=>{
                        return (
                            <div className="border p-4">
                            <RulesViewer value={value} index={index} edit={edit}/>
                            </div>
                        )
                    })}
                    <Button className="btn btn-primay m-1" onClick={submitRules}>Submit</Button>
                </div>
                {showToast?<ToastComponent setShowToast={setShowToast} showToast={showToast} message={message}/>:""}
            </div>
        )
    }
    else
    {
        return (
            <div>
                <FileUploadComponent uploadId={uploadId} setUploadId={setUploadId}/>
            </div>
        )
    }
}