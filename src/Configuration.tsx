import config from "./Configuration.json"

class Configuration {
    private readonly configuration: AppConfiguration;

    constructor() {
        
        this.configuration = config as AppConfiguration;
        this.getHomeAssistantConfig().secret_token = process.env.REACT_APP_HOME_ASSISTANT_SECRET_TOKEN ?? ""
    }

    public getEnturConfig(): EnturConfig {
        return this.configuration.Entur;
    }

    public getBusStopConfigs(): BusStopConfiguration[] {
        return this.configuration.Entur.BusStopConfiguration;
    }

    public getKanyeQuoteEndpoint(): string {
        return this.configuration.KanyeQuoute.Endpoint;
    }

    public getElectricityEndpoint(): string {
        return this.configuration.ElectricityPrices.Endpoint;
    }

    public getWeatherEndpoint(): string {
        return this.configuration.Weather.Endpoint;
    }

    public getSunriseEndpoint(): string {
        return this.configuration.Sunrise.Endpoint;
    }

    public getHomeAssistantConfig(): HomeAssitantConfig {
        return this.configuration.HomeAssistant;
    }
}

interface AppConfiguration {
    Entur: EnturConfig;
    ElectricityPrices: ElectricityPricesConfig;
    KanyeQuoute: KanyeQuoteConfig;
    Weather: WeatherConfig;
    Sunrise: SunriseConfig;
    HomeAssistant: HomeAssitantConfig;
}

interface EnturConfig extends EndpointConfig {
    Identifier: string;
    BusStopConfiguration: BusStopConfiguration[];
}

interface ConfigColor {
    general: number;
    green: number;
    yellow: number;
}

interface ConfigCard {
    numRows: number;
    minFilter: number;
}

interface BusStopConfiguration {
    title: string;
    startPlace: string;
    stopPlace: string;
    configCard: ConfigCard;
    configColor: ConfigColor;
}

interface EndpointConfig {
    Endpoint: string
}

interface ElectricityPricesConfig extends EndpointConfig {}

interface KanyeQuoteConfig extends EndpointConfig {}

interface WeatherConfig extends EndpointConfig {}

interface SunriseConfig extends EndpointConfig {}

interface HomeAssitantConfig extends EndpointConfig {
    secret_token: string
}


const configuration = new Configuration();
export default configuration;