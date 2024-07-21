import Welcome from "./Pages/welcome";
import ViewerPage from "./Pages/ViewerPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import ToastComponent from "./Components/ToastComponent";
import  React, {useState,useEffect} from 'react';

function App() {

  const [showToast, setShowToast] = useState(false);
  const [message,setMessage] = useState("");
  const showAlert = (message)=>{
    setMessage(message);
    setShowToast(true);
  }

  const url = window.location.pathname;
  if(url==="/")
  {
    return (
      <div>
        <h1 className="text-center">Sharing Service</h1>
        <Welcome/>
      </div>
    )  
  }

  if(url.match("/view/[0-9]+")!==null)
  {
    return(
      <div>
        <h1 className="text-center">Sharing Service</h1>
        {showToast?<ToastComponent setShowToast={setShowToast} showToast={showToast} message={message}/>:""}
        <ViewerPage uploadId={url.split("/")[2]} showAlert={showAlert}/>
      </div>
    )
  }
}

export default App;
