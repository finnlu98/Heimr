export class SunriseResponse {
    properties!: Properties
}

class Properties {
    sunrise!: Sunrise
    sunset!: Sunset
}

class EventTime {
    time!: string
}

class Sunrise extends EventTime { }
class Sunset extends EventTime { }

