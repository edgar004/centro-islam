import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
const token = localStorage.getItem("Islam_auth_token") || {};
function PrivateRoute({
  component: Component,socialMedia,

  // state: {
  //   globalState: { isUserLoggedIn },
  // },
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        (token && <Component {...props} socialMedia={socialMedia}/>) || (
          <Redirect to="/inicio" />
        )
      }
    />
  );
}
const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps)(PrivateRoute);
