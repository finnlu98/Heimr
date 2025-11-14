import { Application, Request, Response, Router } from "express";
import { ElectricityRouter } from "../Modules/Electricity/ElectricityRouter";

export class Routes {
    app: Application
    router: Router

    constructor(app: Application) {
        this.app = app
        this.router = Router();
        this.InitializeBaseEndpoint();
        this.RegisterRoutes();
    }

    InitializeBaseEndpoint() {
        this.router.get("", async (req: Request, res: Response) => {
            res.send("Server for Heimr. Lets get kicking")
        })
    }

    RegisterRoutes() {
        const electricty = new ElectricityRouter()
        this.app.use("/", this.router)
        this.app.use("/api", electricty.route)
    }
}