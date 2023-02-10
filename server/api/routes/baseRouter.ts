import { Router } from "express";

class BaseRouter {
    protected router: Router

    constructor() {
        this.router = Router();
    }

    public getRoutes() {
        return this.router
    }
}

export default BaseRouter;