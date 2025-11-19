import { Router } from "express";
import IFetcher from "./IFetcher";


export default interface IRoute {
    route: Router
    subRoute: string
    setRoute(): void

}