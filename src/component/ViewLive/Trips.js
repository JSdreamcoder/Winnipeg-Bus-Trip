import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "./ViewLive.css";
const Trips = ({ trip }) => {
  console.log(trip);
  return (
    <>
      <DropdownButton
        title={`Total Time: ${trip.times.durations.total}min`}
        id="dropdown-menu-align-responsive-1"
      >
        {trip.segments.map((el, index) => {
          console.log(`in foreach index:${index}`);
          if (index === trip.segments.length - 1) {
            return (
              <div className="DropdownItem">
                <Dropdown.Item href="#/action-1">
                  <i className="fas fa-walking" aria-hidden="true"></i> Walk for
                  ${el.times.durations.total} minutes to Your Destination
                </Dropdown.Item>
              </div>
            );
          } else if (el.type === "walk") {
            console.log("walk");
            return (
              <div className="DropdownItem">
                <Dropdown.Item href="#/action-2">
                  {" "}
                  <i className="fas fa-walking" aria-hidden="true"></i>Walk for
                  ${el.times.durations.total} minutes to stop #${el.to.stop.key}{" "}
                  - ${el.to.stop.name}
                </Dropdown.Item>
              </div>
            );
          } else if (el.type === "ride") {
            return (
              <div className="DropdownItem">
                <Dropdown.Item href="#/action-3">
                  {" "}
                  <i className="fas fa-bus" aria-hidden="true"></i>Ride the $
                  {el.route.name} for ${el.times.durations.total} minutes.
                </Dropdown.Item>
              </div>
            );
          } else if (el.type === "transfer") {
            return (
              <div className="DropdownItem">
                <Dropdown.Item href="#/action-4">
                  <i className="fas fa-ticket-alt" aria-hidden="true"></i>
                  Transfer from stop #${el.from.stop.key} -${el.from.stop.name}{" "}
                  to stop #$
                  {el.to.stop.key} - ${el.to.stop.name}
                </Dropdown.Item>
              </div>
            );
          }
        })}
      </DropdownButton>
    </>
  );
};

export default Trips;
