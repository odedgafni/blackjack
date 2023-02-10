import { Request, Response } from "express";
import BaseController from "./baseController";
import deckService from "../services/deck";

class DeckController extends BaseController {
    async getNewDeck(req: Request, res: Response) {
        try {
            const deck = await deckService.newDeck();
            res.json({ success: true, deck });
        } catch (error) {
            console.error(`getNewDeck - Error: ${error}`);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}

export default DeckController;
