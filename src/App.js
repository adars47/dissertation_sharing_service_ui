import Welcome from "./Pages/welcome";
import ViewerPage from "./Pages/ViewerPage";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const Notification = React.createContext();

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
        <ViewerPage uploadId={url.split("/")[2]}/>
      </div>
    )
  }
}

export default App;
