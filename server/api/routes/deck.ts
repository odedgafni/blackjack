import BaseRouter from "./baseRouter";
import DeckController from "../controllers/deck";

class DeckRouter extends BaseRouter {
    private controller = new DeckController();

    constructor() {
        super();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get("/", this.controller.getNewDeck.bind(this));
    }
}

export default new DeckRouter().getRoutes();
