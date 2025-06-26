import { Switch,Route } from "react-router-dom";
import "./App.css";

import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";



function App() {

  return (
    <div>
 
      <Switch>
        <Route exact path="/" component={SignupPage}/>
        <Route exact path="/dashboard" component={Dashboard}/>
      </Switch>
    </div>
  );
}

export default App;
