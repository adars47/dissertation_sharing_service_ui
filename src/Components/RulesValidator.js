import { FilePond,registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import Grid from '@mui/material/Grid';
import React,{useState} from 'react'
registerPlugin(FilePondPluginFileEncode);

export default (props)=>{
    const [files,setFiles] = useState([]);
    const resetFilepond = ()=>{
        setFiles([]);
    }

    return (
        <div>
            <Grid>
                <div style={{margin:10}}>
                    <FilePond files={files} allowMultiple={false} onupdatefiles={async (fileItems) => {
                        const file = fileItems[0];
                        if(file===undefined)
                        {
                            props.setKeys(null,props.index);
                            return;
                        }
                        const text = await file.file.text()
                        const json = await JSON.parse(text);
                        if(json===null)
                        {
                            props.showAlert("Invalid Key");
                            resetFilepond();                        
                            return;
                        }
                        if("payload" in json && "signature" in json)
                        {
                            props.setKeys(json,props.index);
                            setFiles(fileItems);
                        }
                        else
                        {
                            props.showAlert("Invalid Key");
                            resetFilepond();                        
                        }

                    }}></FilePond>
                </div>
          </Grid>            
        </div>
    )
}