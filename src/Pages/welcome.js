import React,{useState,useEffect} from "react"
import RulesViewer from "../Components/RulesViewer";
import RulesEditor from "../Components/RulesEditor";
import { Button } from "react-bootstrap";

export default (props) => {

    const [rules,setRules] = useState([]);
    const [expiresAt,setExpiresAt] = useState(null);
    const [showForm,setShowForm] = useState(false);
    const [selectedRule,setSelectRule] = useState(null);
    const [selectedIndex,setSelectedIndex] = useState(null);

    useEffect(()=>{
        setRules([
        ]);

        setExpiresAt("2024-10-18");    
    },[]);

    const submitRules = async() =>{
        if((rules) ||  expiresAt === null)
        {
            return ;
        }

        const payload = {
            rules:rules,
            expires_at:expiresAt
        }

        const response = await fetch("",{
            method: "POST",
            body: JSON.stringify(payload)
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

    return (
        <div className="container">
            {showForm?<RulesEditor selectedRule={selectedRule} setShowForm={setShowForm} rules={rules} index={selectedIndex} setRules={setRules}/>:""}
            <h1>Pruposed Rules</h1>
            Create Rule <Button onClick={add}>+</Button>
            {rules.map((value,index)=>{
                return (
                    <div className="border p-4">
                    <RulesViewer value={value} index={index} edit={edit}/>
                    </div>
                )
            })}
        </div>
    )
}