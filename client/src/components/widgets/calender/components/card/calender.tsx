import { useEffect, useState } from "react";
import CalenderFetcher from "../../api/calender-fetcher";
import "./calender.css"
import { CalenderResponse } from "../../model/CalenderResponse";
import CalenderRow from "./calender-row";
import { v4 as uuidv4 } from "uuid";
import { CalenderConfig } from "../../CalenderWidget";
import { WidgetEnum } from "../../../model/widget-type";
import { useDashboard } from "../../../../dashboard/dashboard-context";

const Calender: React.FC = () => {
    
    const [calenderItems, setCalenderItems] = useState<CalenderResponse>()
    const [firstEvent, ...secondaryEvents] = calenderItems?.items ?? []
    const { widgetConfigs } = useDashboard()
    const calenderConfig = widgetConfigs[WidgetEnum.calender] as CalenderConfig
    
    useEffect(() => {
        const getCalenderItems = async () => {
            setCalenderItems(await CalenderFetcher(calenderConfig.calenderKey, calenderConfig.calenderId))
        }
        getCalenderItems()

    }, [])

    function setCalenderRows() {
        if(calenderItems?.items.length === 0)
            return (<div>No activities planned here, come on guys. Have some fun 🤦‍♂️</div>)
        
        return (
            <div className="secondary-items-container">
                {secondaryEvents?.map((item) => {
                    return <CalenderRow key={uuidv4()} item={item} hiearchy="secondary" />
                })}
            </div>
        )
    }


    return (
        <div className="calender-container">
            <div className="main-item-container">
                <div className="widget-title">Next activities..</div>
                {calenderItems?.items.length !== 0 && <CalenderRow item={firstEvent} hiearchy="main"/>} 
            </div>
            {setCalenderRows()}
        </div>
        )
}

export default Calender;