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

    function setCalenderRows() {
        if(calenderItems?.items.length === 0)
            return (<div>No activities planned here, come on guys. Have some fun 🤦‍♂️</div>)
        
        return (
            <div className="secondary-items-container">
                {secondaryEvents?.map((item) => {
                    return <CalenderRow item={item} hiearchy="secondary" />
                })}
            </div>
        )
    }


    return (
        <div className="calender-container">
            <div className="main-item-container">
                <div className="main-subheader">Next activities..</div>
                {calenderItems?.items.length !== 0 && <CalenderRow item={firstEvent} hiearchy="main"/>} 
            </div>
            {setCalenderRows()}
        </div>
        )
}

export default Calender;