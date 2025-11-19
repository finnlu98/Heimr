import IFetcher from "./IFetcher";

export default interface IFethcerEndpoint extends IFetcher {
    endpoint?: string
    header?: object
    setEndpoint(endpoint: string): void
    setHeader(header: object): void
}