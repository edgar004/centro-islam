import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import esLocale from "@fullcalendar/core/locales/es";
import { Col } from "reactstrap";

const CalendarSchedule = ({ events }) => {
  useEffect((e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
  });

  return (
    <Col>
      <FullCalendar
        locale={esLocale}
        plugins={[dayGridPlugin]}
        events={events}
        initialView="dayGridMonth"
      />
    </Col>
  );
};
export default CalendarSchedule;
