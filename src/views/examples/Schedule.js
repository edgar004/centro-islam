import React, { useEffect, useState } from "react";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import SchedulePageHeader from "components/Headers/SchedulePageHeader";
import { connect } from "react-redux";
import CalendarSchedule from "components/Calendar";
import { get } from "helpers/fetch";

function Schedule({
  home,
  socialMedia
}) {
  const [scheduleConvertData, setScheduleConvertData] = useState([]);
  const arr = [];
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  const getData = () => {
    get("/evento")
      .then((e) => e.json())
      .then(({ data }) => {
        //eslint-disable-next-line
        data.map(({ titulo: title, fecha: date, url }) => {
          arr.push({ title, date, url });
        });
        setScheduleConvertData(arr);
      });
  };

  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <ExamplesNavbar socialMedia={socialMedia} />
      <div className="wrapper">
        <SchedulePageHeader logo={home[0] && home[0].logo} />
        <div className="section section-about-us">
          <CalendarSchedule events={scheduleConvertData} />
          {/* <h4 className="text-center" style={{ margin: "6%" }}>
            No hay ninguna información para mostrar
          </h4> */}
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return { state };
};
export default connect(mapStateToProps)(Schedule);
