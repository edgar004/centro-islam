import React, { useEffect } from "react";
import IndexHeader from "components/Headers/IndexHeader.js";

import EventCard from "../../components/EventCard/index.js";
import { connect } from "react-redux";
import DefaultFooter from "components/Footers/DefaultFooter.js";

function Activities({
  activities,
  home,
  getActivitiesData,
  state: {
    globalState: { socialMedia },
  },
}) {
  useEffect(() => {
    getActivitiesData();
    // eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  return (
    <>
      <div>
        <IndexHeader socialMedia={socialMedia} logo={home[0] && home[0].logo} />
        <div className="main" >
          {!activities.length ? (
            <div className="section section-about-us">
              <h4 className="text-center" style={{ margin: "6%" }}>
                No hay ninguna información para mostrar
              </h4>
            </div>
          ) : (
            <EventCard activities={activities} />
          )}
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return { state };
};
export default connect(mapStateToProps)(Activities);
