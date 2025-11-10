import axios from "axios";
import moment from "moment";
import configuration from "../Configuration";
import { CalenderResponse } from "../model/Deziarilize/CalenderResponse";

const CalenderFetcher = async () => {
    try {
        const API_KEY = process.env.REACT_APP_GOOGLE_CALENDER_KEY ?? "";
        const CAL_ID = process.env.REACT_APP_GOOGLE_CALID ?? "";
        const TIME_MIN = `${moment().format('YYYY-MM-DD')}T00:00:00Z`;

        var endoint = configuration.getCalenderEndpoint()
                        .replace(":CAL_ID", CAL_ID)
                        .replace(":API_KEY", API_KEY)
                        .replace(":TIME_MIN", TIME_MIN)

        const res = await axios.get<CalenderResponse>(endoint)       
        
        res.data.items = res.data.items
            .map((item) =>  {
                if(item.start.dateTime === undefined) {
                    item.start.dateTime = moment(item.start.date).toString();
                }

                console.log(item.creator?.email) 

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