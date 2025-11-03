export default class TravelResponse {
    data!: Data
}

class Data {
    trip !: Trip
}

class Trip {
    tripPatterns !: TripPatterns[]
}

class TripPatterns {
    legs!: Leg[]
}

class Leg {
    expectedStartTime!: string
    expectedEndTime!: string
    mode!: string
    distance!: number
    fromPlace!: Place
    toPlace!: Place
    line!: Line
}

class Place {
    name!: string
}

class Line {
    id!: string
    publicCode!: string
    name!: string
}

