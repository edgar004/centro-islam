import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import dotenv from "dotenv";

// core components
import Home from "./views/examples/Home";
import Schedule from "views/examples/Schedule";
import Admin from "views/examples/Admin";
import Activities from "views/examples/Activities";
import store from "../src/redux/actions";
import { Provider } from "react-redux";
import LoginPage from "views/examples/LoginPage";
import ActivitiesForm from "components/ActivitiesForm";
import ScheduleForm from "components/ScheduleForm";
import SocialMediaForm from "components/SocialMediaForm";
import GeneralConfigForm from "components/GeneralConfigForm";
import PrivateRoute from "components/PrivateRoute";
import { get } from "helpers/fetch";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import ProfileForm from "components/ProfileForm";
dotenv.config();

function App() {
  const [url, setUrl] = useState([]);
  const [activities, setActivities] = useState([]);
  const [config, setConfig] = useState([]);
  const [owner, setOwner] = useState([]);
  const getUrlData = async () => {
    await get("/red")
      .then((e) => e.json())
      .then(({ data }) => setUrl(data));
  };
  const getActivitiesData = async () => {
    await get("/actividad")
      .then((e) => e.json())
      .then(({ data }) => setActivities(data));
  };
  const getConfigData = async () => {
    await get("/configuracion")
      .then((e) => e.json())
      .then(({ data }) => setConfig(data));
  };
  const getOwnerData = () => {
    get("/propietario")
      .then((e) => e.json())
      .then(({ data }) => setOwner(data));
  };

  useEffect(() => {
    getUrlData();
    getActivitiesData();
    getOwnerData();
    getConfigData();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Provider store={store}>
            <ExamplesNavbar socialMedia={url} />
            <Route
              exact
              path="/inicio"
              render={(props) => (
                <Home
                  {...props}
                  socialMedia={url || []}
                  config={config || []}
                  owner={owner || []}
                />
              )}
            />
            <Route
              path="/actividades"
              render={(props) => (
                <Activities
                  {...props}
                  socialMedia={url}
                  getActivitiesData={getActivitiesData}
                  activities={activities}
                  home={config}
                />
              )}
            />
            <Route path="/login" render={(props) => <LoginPage {...props} />} />
            <Route
              path="/agenda"
              render={(props) => <Schedule {...props} home={config} socialMedia={url} />}
            />
            <Route
              path="/actividades-form"
              render={(props) => <ActivitiesForm {...props} />}
            />
            <Route
              path="/eventos-form"
              render={(props) => <ScheduleForm {...props} />}
            />
            <Route
              path="/perfiles-form"
              render={(props) => <ProfileForm {...props} />}
            />
            <Route
              path="/redes-form"
              render={(props) => <SocialMediaForm {...props} />}
            />
            <Route
              path="/configuracion-form"
              render={(props) => <GeneralConfigForm {...props} />}
            />
            <Redirect to="/inicio" />
            <Redirect from="*" to="/inicio" />
            <PrivateRoute
              exact
              path="/admin"
              socialMedia={url}
              component={Admin}
            />
          </Provider>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
