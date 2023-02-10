import BaseRouter from "./baseRouter";
import deckRoutes from './deck'

class ApiRoutes extends BaseRouter {
    constructor() {
        super();
        this.initRoutes();
    }

    initRoutes() {
        this.router.use("/deck", deckRoutes);
    }
}

export default new ApiRoutes().getRoutes();
