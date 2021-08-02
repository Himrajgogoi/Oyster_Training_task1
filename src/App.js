
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "./Questionaire.css";
import {store} from "./store";
import {Provider} from "react-redux";
import Main from './Components/Main';


function App() {
 
  return (
   <Provider store={store}>
      <Main/>
   </Provider>
  );
}

export default App;
