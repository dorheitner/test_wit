/** @format */
import "semantic-ui-css/semantic.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useRecoilState } from "recoil";

import Layout from "./components/Layout/Layout";
import Events from "./Pages/Events";
import CatchErrors from "./components/Errors/CatchErrors";
import NotFound from "./components/NotFound/NotFound";
import { errorState } from "./store/atons";
import "normalize.css";

import "./App.css";
function App() {
  const [error] = useRecoilState(errorState);

  return (
    <div className="App">
      <Router>
        <Layout>
          <CatchErrors error={error}>
            <Switch>
              <Route exact path="/" component={Events} />
              <Route component={NotFound} />
            </Switch>
          </CatchErrors>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
