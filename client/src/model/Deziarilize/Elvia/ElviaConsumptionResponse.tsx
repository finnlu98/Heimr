export interface ElviaConsumptionResponse {
    meteringPoints: MeteringPoint
}

interface MeteringPoint {
    meteringPointId: string
    meterValue: MeterValue
}

interface MeterValue {
    timeSeries: TimeSerie[]
}

interface TimeSerie {
    startTime: string
    endTime: string
    value: number
}