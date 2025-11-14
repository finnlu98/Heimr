import { ComponentData, Datasets } from "../model/Deziarilize/ElectricityPrices";
import { ElviaConsumptionResponse, MeteringPoint, TimeSerie } from "../model/Deziarilize/Elvia/ElviaConsumptionResponse";
import moment from "moment";

export class ElviaService {
    elviaConsumption: MeteringPoint | null

    constructor(elivaConsumptionResponse: ElviaConsumptionResponse) {
        this.elviaConsumption = elivaConsumptionResponse.meteringpoints.length === 1
            ? elivaConsumptionResponse.meteringpoints[0] : null;
    }

    getMonthlyConsumption() {
        return this.elviaConsumption?.metervalue.timeSeries
    }
    
    getTodaysConsumption() {
        return this.getMonthlyConsumption()?.filter((timeSerie) => moment(timeSerie.startTime) > moment().startOf('day'))
    }

    // Lots of copy pasta
    // Consumption today
    getConsumptionToday() : number {
        var c = this.getTodaysConsumption()?.reduce((usage, c) => usage + c.value, 0) ?? 0;

        return Number((c ?? 0).toFixed(2));
    }

    // Highest hour
    getHighestHour() : TimeSerie | undefined {
       var h = this.getTodaysConsumption()?.reduce((highestHour, curr) => highestHour.value < curr.value ? curr : highestHour);
       if(h)
        h.value = Number((h.value ?? 0).toFixed(2));
       return  h
    }

    getChartFormattedData(): ComponentData {
        const monthlyData = this.getMonthlyConsumption();
        const days = Array.from({ length: moment().daysInMonth() }, () => 0)
        
        if(monthlyData) {
            // due to incombatibility with group by
            const highestConsumption = monthlyData.reduce((acc, t) => {
                const day = moment(t.startTime).date();

                if (!acc[day]) acc[day] = [];
                acc[day].push(t);

                return acc;
            }, {} as Record<number, typeof monthlyData>);
            
            days.forEach((value, index) => {
                var consDay = highestConsumption[(index + 1)]
                var maxConsumption = consDay?.reduce((maxHour, curr) => maxHour.value < curr.value ? curr : maxHour)
                if(maxConsumption)
                    days[index] = Number((maxConsumption.value ?? 0).toFixed(2));
            });
        }

        const labels = days.map((value, index) => (index + 1).toString())
        
        return new ComponentData(labels, [new Datasets(days)])


    }

    // Highest hours per day - needs to learn about caching

    // Price

}