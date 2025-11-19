import Cache from "../../../Cache/Cache"

export default interface IFetcher {
    cache: Cache | undefined
    

    fetchData(): Promise<any>
    getData(): Promise<any>
    returnCache(endpoint: string): void
    
}
