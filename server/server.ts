import express, { Application } from "express";
import apiRoutes from "./api/routes/routes";
import cors from "cors";

class Server {
    private port: number;
    private app: Application;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.initializeMiddleWares();
        this.initializeRoutes();
    }

    private initializeMiddleWares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    private initializeRoutes() {
        this.app.use("/api", apiRoutes);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

const server = new Server(8080);
server.listen();
