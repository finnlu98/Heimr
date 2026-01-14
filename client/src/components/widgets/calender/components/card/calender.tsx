import "./calender.css";
import CalenderRow from "./calender-row";
import { v4 as uuidv4 } from "uuid";
import { useCalender } from "../../context/CalenderContext";

const Calender: React.FC = () => {
  const { calenderEvents } = useCalender();
  const [firstEvent, ...secondaryEvents] = calenderEvents ?? [];

  function setCalenderRows() {
    if (calenderEvents?.length === 0) return <div>No activities planned here, come on guys. Have some fun 🤦‍♂️</div>;

    return (
      <div className="secondary-items-container">
        {secondaryEvents?.map((item) => {
          return <CalenderRow key={uuidv4()} item={item} hiearchy="secondary" />;
        })}
      </div>
    );
  }

  return (
    <div className="calender-container">
      <div className="main-item-container">
        <div className="widget-title">Next activities..</div>
        {calenderEvents?.length !== 0 && <CalenderRow item={firstEvent} hiearchy="main" />}
      </div>
      {setCalenderRows()}
    </div>
  );
};

export default Calender;
