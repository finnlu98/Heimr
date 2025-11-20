import axios from "axios";
import moment from "moment";
import configuration from "../../../../Configuration";
import { CalenderResponse } from "../model/CalenderResponse";
const CalenderFetcher = async () => {
    try {
        const API_KEY = process.env.REACT_APP_GOOGLE_CALENDER_KEY ?? "";
        const CAL_ID = process.env.REACT_APP_GOOGLE_CALID ?? "";
        const TIME_MIN = `${moment().format('YYYY-MM-DD')}T00:00:00Z`;
        
        const config = configuration.getCalenderConfig()

        var endoint = config.Endpoint
                        .replace(":CAL_ID", CAL_ID)
                        .replace(":API_KEY", API_KEY)
                        .replace(":TIME_MIN", TIME_MIN)
                        .replace(":MAX_RESULTS", config.maxResults.toString())

        const res = await axios.get<CalenderResponse>(endoint)       
        
        res.data.items = res.data.items
            .map((item) =>  {
                if(item.start.dateTime === undefined) {
                    item.start.dateTime = moment(item.start.date).toString();
                }
                return item
            })
            .sort((item1, item2) => moment(item1.start.dateTime).diff(moment(item2.start.dateTime)))

        return res.data;

    } catch (error) {
        console.error("Can't get Google Calender data");
        throw error;
    }
}


export default CalenderFetcher