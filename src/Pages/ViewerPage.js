import axios from "axios";
import React,{useState,useEffect} from "react";

export default (props) =>{
    const uploadId = props.uploadId;
    const [rules,setRules] = useState([])

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/getRules/"+111)
        .then(async(response)=>{
            console.log(response.data[0]);
        }).catch((response)=>{
            if(response.response.status===404)
            {

                
            }
        })
    },[]);

};