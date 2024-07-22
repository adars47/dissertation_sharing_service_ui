import axios from "axios";
import React,{useState,useEffect} from "react";
import RulesViewer from "../Components/RulesViewer";
import { Card } from "react-bootstrap";
import RulesValidator from "../Components/RulesValidator";

export default (props) =>{
    const uploadId = props.uploadId;
    const [rules,setRules] = useState([])
    let kkeys =[];
    useEffect(()=>{
        axios.get("http://sharingserviceb.dynv6.net/api/getRules/"+uploadId)
        .then(async(response)=>{
            setRules(response.data);
        }).catch((response)=>{
            if(response.response.status===404)
            {
                props.showAlert("Invalid Id!!")   
            }
        })
    },[]);

    const addKeys = (key,index) =>{
        kkeys[index]= key;
        let payload = null;
        if(rules.length===kkeys.length)
        {
            payload = rules.map((value,rindex)=>{
                return {
                    ruleId: value.id,
                    key: kkeys[rindex]
                }
            })

            
            axios.post("http://sharingserviceb.dynv6.net/api/satisfy/"+uploadId,payload)
            .then((response)=>{
                if(response.status===200)
                {
                    const url = "http://sharingserviceb.dynv6.net/download?filename="+response.data;
                    console.log(url);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', uploadId+".zip"); 
                    document.body.appendChild(link);
                    link.click();
                }
            })
            .catch((reason)=>{
                console.log(reason);
                props.showAlert("Something Went wrong!");   
            })
        }
    }

    return (
    <div>
        {rules.map((value,index) =>{
            let tmp = { ...value};
            tmp.attributes = JSON.parse(value.attributes);
            return (
                <Card className="card m-5">
                    <RulesViewer value={tmp} hideEdit={true}/>
                    <RulesValidator setKeys={addKeys} index={index} showAlert={props.showAlert}/>
                </Card>
            )
        })}
    </div>
)

};