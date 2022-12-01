import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Videogames from "./components/Videogames/Videogames";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/videogames" component={Videogames}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
