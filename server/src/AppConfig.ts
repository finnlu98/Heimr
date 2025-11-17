import configFile from "./Configuration.json";

class AppConfig {
    private readonly configuration: AppConfiguration;

    constructor() {
        this.configuration = configFile as AppConfiguration;
    }
}

interface AppConfiguration {
}

const appConfig = new AppConfig();
export default appConfig;