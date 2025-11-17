import { Router, Request, Response } from "express";
import IRoute from "../Model/Interface/IRoute";
import IFetcher from "../Model/Interface/IFetcher";

export default abstract class BaseRouter implements IRoute {
    route: Router;
    subRoute: string;
    fetcher: IFetcher;

    constructor(subRoute: string, fetcher: IFetcher) {
        this.route = Router()
        this.subRoute = subRoute;
        this.fetcher = fetcher;

        this.setRoute()
        
    }

    abstract setRoute(): void 
} 