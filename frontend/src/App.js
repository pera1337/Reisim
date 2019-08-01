import React from "react";
import { Switch, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { CityProvider } from "./contexts/CityContext";
import { PlaceProvider } from "./contexts/PlaceContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import NavB from "./components/NavB";
import CreateGuide from "./components/CreateGuide";
import Guide from "./components/Guide";
import UserProfile from "./components/UserProfile";
import EditProfile from "./components/EditProfile";
import FollowingFeed from "./components/FollowingFeed";
import SearchTest from "./components/SearchTest";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <NavB />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/feed" component={FollowingFeed} />
          <Route exact path="/search" component={SearchTest} />
          <Route exact path="/guide/create">
            <CityProvider>
              <PlaceProvider>
                <CreateGuide />
              </PlaceProvider>
            </CityProvider>
          </Route>
          <Route
            exact
            path="/guide/:id"
            render={routeProps => <Guide id={routeProps.match.params.id} />}
          />
          <Route
            exact
            path="/guide/edit/:id"
            render={routeProps => (
              <CityProvider>
                <PlaceProvider>
                  <CreateGuide id={routeProps.match.params.id} edit="true" />
                </PlaceProvider>
              </CityProvider>
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
        </Switch>
      </UserProvider>
    </div>
  );
}

export default App;
