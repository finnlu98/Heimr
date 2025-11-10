import { useEffect, useState } from "react";
import CalenderFetcher from "../../api/calender-fetcher";
import "./calender.css"
import { CalenderResponse } from "../../model/Deziarilize/CalenderResponse";
import CalenderRow from "./calender-row";

const Calender: React.FC = () => {
    
    const [calenderItems, setCalenderItems] = useState<CalenderResponse>()
    const [firstEvent, ...secondaryEvents] = calenderItems?.items ?? []
    
    useEffect(() => {
        const getCalenderItems = async () => {
            setCalenderItems(await CalenderFetcher())
        }
        getCalenderItems()
    }, [])

    return (
        <div className="calender-container">
            <div className="main-item-container">
                <div className="main-subheader">Next activities..</div>
                <CalenderRow item={firstEvent} hiearchy="main"/>
            </div>
            <div className="secondary-items-container">
                {secondaryEvents?.map((item) => {
                    return <CalenderRow item={item} hiearchy="secondary" />
                })}
            </div>
            
        </div>
        )
}

export default Calender;