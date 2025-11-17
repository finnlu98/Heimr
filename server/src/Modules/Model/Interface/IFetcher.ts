import Cache from "../../../Cache/Cache"

export default interface IFetcher {
    cache: Cache | undefined
    endpoint?: string
    header?: object

    fetchData(): Promise<any>
    getData(): Promise<any>
    returnCache(endpoint: string): void
    setEndpoint(endpoint: string): void
    setHeader(header: object): void
}
