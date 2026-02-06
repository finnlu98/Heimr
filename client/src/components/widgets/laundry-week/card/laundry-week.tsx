import { useState } from "react";
import moment from "moment";
import "./laundry-week.css";

import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { LaundryWeekConfig } from "../LaundryWeekWidget";
import { useDashboard } from "../../../dashboard/dashboard-context";
import EditWidget from "../../core/components/EditWidget";
import { WidgetEnum } from "../../core/model/widget-type";

const washingEmojis = ["✨", "💧", "🛁", "🧴", "🧼", "🧽", "🚿", "🧹", "🧤", "🫧"];

const LaundryWeek: React.FC = () => {
  const currentWeek = moment().isoWeekday(1).isoWeek();
  const currentEmoji = washingEmojis[currentWeek % washingEmojis.length];
  const [isExpanded, setIsExpanded] = useState(false);
  const { widgetConfigs } = useDashboard();
  const laundryConfig = (widgetConfigs[WidgetEnum.laundryWeek] as LaundryWeekConfig) ?? {
    responsibles: [],
  };

  const createLaundryList = (startWeek: number, endWeek: number, names: string[]) => {
    const records = [];
    const totalNames = names.length;

    for (let week = startWeek; week <= endWeek; week++) {
      const nameIndex = (week - startWeek) % totalNames;
      records.push({
        week: week,
        name: names[nameIndex],
      });
    }

    return records;
  };

  const allWeeks = createLaundryList(1, 52, laundryConfig.responsibles ?? []);
  const displayedWeeks = isExpanded ? allWeeks : allWeeks.filter((week) => week.week === currentWeek);

  return (
    <div className="laundry-week">
      <div className="laundry-week-header widget-title">
        <div>Washing in week {currentWeek}</div>
      </div>
      {laundryConfig.responsibles.length !== 0 ? (
        <>
          {displayedWeeks.map((week, weekIndex) => (
            <div
              className={`week-row ${isExpanded ? "expand" : ""} ${week.week === currentWeek ? "highlight" : ""}`}
              key={weekIndex}
            >
              {isExpanded ? (
                <>
                  <div>{week.week}</div>
                  <div>{week.name}</div>
                </>
              ) : (
                <div>
                  {week.name} {currentEmoji}
                </div>
              )}
            </div>
          ))}

          <div className="expand-icon" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <SlArrowUp /> : <SlArrowDown />}
          </div>
          <div className="rodt-slogan">
            <img src={"./img/laundry-week/rodt_logo.png"} width={40} height={40} alt="Fordi felleskap fungerer" />
            <p>Fordi felleskap fungerer</p>
          </div>
        </>
      ) : (
        <EditWidget widgetKey={WidgetEnum.laundryWeek} />
      )}
    </div>
  );
};

export default LaundryWeek;
