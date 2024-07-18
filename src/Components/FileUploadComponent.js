import { FilePond,registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useState } from "react";
import axios from "axios";
registerPlugin(FilePondPluginFileEncode);

export default (props)=>{
    const [personalFiles,setPersonalFiles] = useState({});
    const uploadId = props.uploadId;
    const startUpload = ()=>{
        const formData = new FormData();
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
            console.log(response.status);
            console.log(await response.text)
        });


    };

    return (
    <div>
        <h1> <p className="text-center">Upload files to share</p></h1>
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