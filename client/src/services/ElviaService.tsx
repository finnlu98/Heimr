import { ElviaConsumptionResponse } from "../model/Deziarilize/Elvia/ElviaConsumptionResponse";

export class ElviaService {
    elviaConsumption: ElviaConsumptionResponse

    constructor(elivaConsumptionResponse: ElviaConsumptionResponse) {
        this.elviaConsumption = elivaConsumptionResponse
    }

    // Price

    // Consumption today
    getConsumptionToday(): number {
        return this.elviaConsumption.meteringPoints.meterValue.timeSeries.reduce((usage, c) => usage + c.value, 0);
    }

    // Highest hour

    // Highest hours per day - needs to learn about caching
}