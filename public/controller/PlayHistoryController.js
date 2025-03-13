import { PlayHistoryModel } from "../model/PlayHistoryModel.js";
import { deletePlayHistoryByEmail, getPlayHistoryList } from "../controller/firestore_controller.js";
import { startSpinner, stopSpinner } from "../view/util.js";

export class PlayHistoryController {
    view = null;
    model = null;

    constructor() {
        this.model = new PlayHistoryModel();
        this.onClickClearHistoryButton = this.onClickClearHistoryButton.bind(this);
    }

    setView(view) {
        this.view = view;
    }

    async onClickClearHistoryButton() {
        if (!confirm('Are you sure to delete all game history?')) {
            return;
        }
        startSpinner();
        try {
            stopSpinner();
            await deletePlayHistoryByEmail();
            this.model.historyList = await getPlayHistoryList();
            this.view.render();
        } catch (error) {
            stopSpinner();
            console.error('Error deleting history list: ', error);
            alert('Error deleting history list: ' + error);
        }
    }
}