import React,{useState,useEffect} from "react"
import RulesViewer from "../Components/RulesViewer";
import { Rule } from "@mui/icons-material";
import RulesEditor from "../Components/RulesEditor";

export default (props) => {

    const [rules,setRules] = useState([]);
    const [expiresAt,setExpiresAt] = useState(null);
    const [showForm,setShowForm] = useState(false);
    const [selectedRule,setSelectRule] = useState(null);

    useEffect(()=>{
        setRules([
            {
                "authority":"http://medicalschool.dev",
                "attributes":[
                    "isDoctor",
                    "isMedicalStaff"
                ]
            },
            {
                "authority":"http://ysj.dev",
                "attributes":[
                    "isStudent",
                    "isMedicalStudent"
                ]
            }
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
        console.log(event.target.id);
    };

    return (
        <div className="container">
            {showForm?<RulesEditor selectedRule={selectedRule} setShowForm={setShowForm}/>:""}
            <h1>Pruposed Rules</h1>
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