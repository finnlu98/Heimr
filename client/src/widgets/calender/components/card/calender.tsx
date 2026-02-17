import "./calender.css";
import CalenderRow from "./calender-row";
import { v4 as uuidv4 } from "uuid";
import LoadingHelperWidget from "../../../core/components/LoadingHelperWidget";
import { WidgetEnum } from "../../../core/model/widget-type";
import { CalendarEvent } from "../../api/calender-ical-fetcher";

interface CalenderProps {
  data?: CalendarEvent[] | undefined;
}

const Calender: React.FC<CalenderProps> = ({ data }) => {
  const [firstEvent, ...secondaryEvents] = data ?? [];

  function setCalenderRows() {
    if (data?.length === 0)
      return <div className="empty-calender">No activities planned here, come on guys. Have some fun 🤦‍♂️</div>;

    return (
      <div className="secondary-items-container">
        {secondaryEvents?.map((item) => {
          return <CalenderRow key={uuidv4()} item={item} hiearchy="secondary" />;
        })}
      </div>
    );
  }

  return (
    <LoadingHelperWidget widgetKey={WidgetEnum.calender} showConfig={() => !data} loadingKeys={["fetch-ical-events"]}>
      <div className="calender-container">
        <div className="main-item-container">
          <div className="widget-title">Next activities..</div>
          {data?.length !== 0 && <CalenderRow item={firstEvent} hiearchy="main" />}
        </div>
        {setCalenderRows()}
      </div>
    </LoadingHelperWidget>
  );
};

export default Calender;
