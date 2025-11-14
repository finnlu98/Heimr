import configFile from "./Configuration.json";

class AppConfig {
    private readonly configuration: AppConfiguration;

    constructor() {
        this.configuration = configFile as AppConfiguration;
    }

    public getElviaEndpoint(): string {
        return this.configuration.Elvia.Endpoint;
    }
}

interface AppConfiguration {
    Elvia: ElviaConfig;
}

interface ElviaConfig {
    Endpoint: string;
}

const appConfig = new AppConfig();
export default appConfig;