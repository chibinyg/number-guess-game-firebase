import { AbstractView } from "./AbstractView.js";
import { currentUser } from "../controller/firebase_auth.js";
import { startSpinner, stopSpinner } from "./util.js";
import { getPlayHistoryList } from "../controller/firestore_controller.js";

export class PlayHistoryView extends AbstractView {
    controller = null;

    constructor(controller) {
        super();
        this.controller = controller;
    }

    async onMount() {
        if (!currentUser) {
            this.parentElement.innerHTML = '<h1>Access denied</h1>';
            return;
        }
        console.log('PlayHistoryView.onMount() called');
        
        startSpinner();
        try {
            this.controller.model.historyList = await getPlayHistoryList();
            stopSpinner();
        } catch (error) {
            stopSpinner();
            this.controller.model.historyList = null;
            console.error('Error getting history list: ', error);
            alert('Error getting history list: ' + error);
        }
        //console.log('history list', this.controller.model.historyList);
    }

    async updateView() {
        const viewWrapper = document.createElement('div');
        try {
            const response = await fetch('/view/templates/playHistory.html', { cache: 'no-store' });
            viewWrapper.innerHTML = await response.text();

            const tbody = viewWrapper.querySelector('tbody');
            const historyList = this.controller.model.historyList;
            if (historyList === null) {
                viewWrapper.querySelector('#button-clear-history').disabled = true;
                const div = document.createElement('div');
                div.innerHTML = '<h1>Error loading history list from Firestore</h1>';
                tbody.appendChild(div);
            } else if (historyList.length === 0) {
                viewWrapper.querySelector('#button-clear-history').disabled = true;
                const div = document.createElement('div');
                div.innerHTML = 'No game history found!';
                tbody.appendChild(div);
            } else {
                let rowNum = 1;
                historyList.forEach(history => {
                    const tr = this.#buildHistoryRow(history, rowNum);
                    tbody.appendChild(tr);
                    rowNum++;
                });
            }
        } catch (error) {
            console.error('Error loading playHistory.html: ', error);
            alert('Error loading playHistory.html: ' + error);
            viewWrapper.innerHTML = '<h1>Error loading/fetching playHistory.html</h1>';
        }
        return viewWrapper;
    }

    #buildHistoryRow(history, rowNum) {
        const tr = document.createElement('tr');

        const tdRowNum = document.createElement('td'); 
        tdRowNum.innerHTML = rowNum;
        tr.appendChild(tdRowNum);

        const tdBet = document.createElement('td');
        tdBet.innerHTML = history.bet;
        tr.appendChild(tdBet);

        const tdWin = document.createElement('td');
        tdWin.innerHTML = history.win;
        tr.appendChild(tdWin);

        const tdBalance = document.createElement('td');
        tdBalance.innerHTML = history.balance;
        tr.appendChild(tdBalance);

        const tdTimestamp = document.createElement('td');
        tdTimestamp.innerHTML = new Date(history.timestamp).toLocaleString();
        tr.appendChild(tdTimestamp);
        
        return tr;
    }

    attachEvents() {
        // clear historybutton
        document.getElementById('button-clear-history').onclick = this.controller.onClickClearHistoryButton;
    }

    async onLeave() {
        if (!currentUser) {
            this.parentElement.innerHTML = '<h1>Access denied</h1>';
            return;
        }
        console.log('PlayHistoryView.onLeave() called');
    }
}