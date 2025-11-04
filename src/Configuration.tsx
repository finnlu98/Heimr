import config from "./Configuration.json"

class Configuration {
    private readonly configuration: AppConfiguration;

    constructor() {
        
        this.configuration = config as AppConfiguration;
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
}

interface AppConfiguration {
    Entur: EnturConfig;
    ElectricityPrices: ElectricityPricesConfig;
    KanyeQuoute: KanyeQuoteConfig;
}

interface EnturConfig {
    Endpoint: string;
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


interface ElectricityPricesConfig {
    Endpoint: string;
}

interface KanyeQuoteConfig {
    Endpoint: string;
}


const configuration = new Configuration();
export default configuration;