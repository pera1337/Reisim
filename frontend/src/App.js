import React from "react";
import { Switch, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { CityProvider } from "./contexts/CityContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import NavB from "./components/NavB";
import CreateGuide from "./components/CreateGuide";
import Guide from "./components/Guide";
import UserProfile from "./components/UserProfile";
import EditProfile from "./components/EditProfile";
import "./App.css";
import Sandbox from "./components/Sandbox";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <NavB />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/guide/create" component={CreateGuide} />
          <Route
            exact
            path="/guide/:id"
            render={routeProps => <Guide id={routeProps.match.params.id} />}
          />
          <Route
            exact
            path="/guide/edit/:id"
            render={routeProps => (
              <CreateGuide id={routeProps.match.params.id} edit="true" />
            )}
          />
          <Route
            exact
            path="/user/:id"
            render={routeProps => (
              <UserProfile id={routeProps.match.params.id} />
            )}
          />
          <Route
            exact
            path="/user/edit/:id"
            render={routeProps => (
              <EditProfile id={routeProps.match.params.id} />
            )}
          />
          <CityProvider>
            <Route exact path="/sandbox" render={Sandbox} />
          </CityProvider>
        </Switch>
      </UserProvider>
    </div>
  );
}

export default App;
