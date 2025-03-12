import { AbstractView } from "./AbstractView.js";
import { currentUser } from "../controller/firebase_auth.js";

export class PlayHistoryView extends AbstractView {
    controller = null;

    constructor(controller) {
        super();
        this.controller = controller;
    }

    async onMount() {
        if(!currentUser) {
                    this.parentElement.innerHTML = '<h1>Access denied</h1>'; 
                    return;
                }
                console.log('PlayHistoryView.onMount() called');
    }

    async updateView() {

    }

    attachEvents() {

    }

    async onLeave() {
        if (!currentUser) {
            this.parentElement.innerHTML = '<h1>Access denied</h1>';
            return;
        }
        console.log('PlayHistoryView.onLeave() called');
    }
}