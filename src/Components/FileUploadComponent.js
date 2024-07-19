import { FilePond,registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useState } from "react";
import axios from "axios";
import ToastComponent from "../Components/ToastComponent";



registerPlugin(FilePondPluginFileEncode);

export default (props)=>{
    const [personalFiles,setPersonalFiles] = useState([]);
    const uploadId = props.uploadId;
    const [showToast, setShowToast] = useState(false);
    const [message,setMessage] = useState("");
    const [shareUrl,setShareUrl] = useState(false);
    const showAlert = (message)=>{
    setMessage(message);
    setShowToast(true);
}

    const startUpload = ()=>{
        const formData = new FormData();
        console.log(personalFiles.length)
        if(personalFiles.length === 0)
        {
            showAlert("No files selected");
            return;
        }
        for(let personalFile in personalFiles['files'])
            {
            let val = personalFiles['files'][personalFile];
            formData.append(
                val.filename,
                val.file,
                val.name
            );
        }
        axios.post("http://127.0.0.1:8000/api/uploadFiles/"+uploadId,formData)
        .then(async (response)=>{
            if(response.status===200){
                showAlert("Successfully uploaded");
                setShareUrl(true);
            }
        });
    };

    const back = () =>{
        props.setUploadId(0);
    }

    return (
    <div>
        <h1>
            <p><Button className='btn btn-primary m-3' variant="contained" onClick={back}>Back</Button></p> 
            <p className="text-center">Upload files to share</p>
        </h1>
        {shareUrl?
        <h3>
            <p className="text-center">Share this url to the medical practitioner</p>
            <p className="text-center">{"http://localhost:3000/view/"+uploadId}</p>            
        </h3>
        :
        ""
        }
        {showToast?<ToastComponent setShowToast={setShowToast} showToast={showToast} message={message}/>:""}
        <Grid>
                <div style={{margin:50}}>
                    <FilePond allowMultiple={true} onupdatefiles={(fileItems) => {
                        setPersonalFiles({
                            files: fileItems.map((fileItem) => fileItem),
                        })
                    }}></FilePond>
                </div>
          </Grid>
          <div className="col text-center">
            <Button variant="contained" sx={{marginTop:2}} onClick={startUpload} className="btn m-1">Upload</Button>
          </div>
    </div>
    );
};