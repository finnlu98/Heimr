import { Router, Request, Response } from "express";
import { ElectricityFetcher } from "./ElectricityFetcher";


export class ElectricityRouter {
    route: Router
    subRoute: string
    constructor() {
        this.route = Router()
        this.subRoute = "/electricity/consumption"
    
        this.route.get(this.subRoute, async (req: Request, res: Response) => {
            var elecFetcher = new ElectricityFetcher()

            res.send(await elecFetcher.GetElectricityConsumption())
        })

    }
}