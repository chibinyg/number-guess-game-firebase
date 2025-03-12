import { PlayHistoryModel } from "../model/PlayHistoryModel.js";

export class PlayHistoryController {
    view = null;
    model = null;

    constructor() {
        this.model = new PlayHistoryModel();
    }

    setView(view) {
        this.view = view;
    }
}