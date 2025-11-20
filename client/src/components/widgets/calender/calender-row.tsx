import moment from "moment";
import { CalenderItem } from "./model/CalenderResponse";

interface CalenderRowProps {
    item: CalenderItem
    hiearchy: string
}

const CalenderRow: React.FC<CalenderRowProps> = ({item, hiearchy}) => {
    
    function formatDate(date: string | undefined) {
        if(date === undefined) 
            return "Unkown date"
        const m = moment(date);
        const now = moment();

        const diffDays = m.startOf("day").diff(now.startOf("day"), "days");

        if (diffDays === 0) {
            return `Today`;
        } else if (diffDays === 1) {
            return `Tomorrow`;
        } else if (diffDays === 2) {
            return `In 2 days`;
        } else if (diffDays === 3) {
            return `In 3 days`;
        } else {
            return m.format("dddd MMM Do");
        }
    }

    function formatSummary(summary: string | undefined) {
        return summary ?? "Unkown activity"
    }

    function setAvatarImg(email: string | undefined) {
        if(email === undefined)
            return "undefined"

        if(email.toLocaleLowerCase().includes("finn"))
            return "finn_griggs";

        if(email.toLocaleLowerCase().includes("pernille"))
            return "pernille"

        if(email.toLocaleLowerCase().includes("line"))
            return "line"

        return "unknown"
    }
    
    return (
        <div className={`standard-rows ${hiearchy}-item`}>
            <div className="content-container">
                <div className="date-row">
                    <div className={`${hiearchy}-item-date`}>🗓️ {item && formatDate(item.start.dateTime)}</div>
                    <div className="small-circle avatar-calender">
                        {item?.creator?.email && <img src={`./img/${setAvatarImg(item?.creator?.email)}.jpg`} className="avatar-img" alt="avatar"/>} 
                     </div>
                </div>
                 <div className={`summary ${hiearchy}-item-summary`}>{item && formatSummary(item.summary)}</div> 
            </div>
            
        </div>
    )
} 
export default CalenderRow