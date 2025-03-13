export class PlayHistoryModel {
    historyList = null;

    constructor() {
        this.historyList = [];
    }

    addPlayHistory(history) {
        this.historyList.push(history);
    }

    getPlayHistory() {
        return this.historyList;
    }

    // Delete play history entries by email
    deletePlayHistoryByEmail(email) {
        this.historyList = this.historyList.filter(entry => entry.email !== email);
    }
}