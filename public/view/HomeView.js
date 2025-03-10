import { AbstractView } from "./AbstractView.js";
import { currentUser } from "../controller/firebase_auth.js";

export class HomeView extends AbstractView {
    //instance variables
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
        console.log('HomeView.onMount() called');
    }

    async updateView() {
        console.log('HomeView.updateView() called');
        const viewWrapper = document.createElement('div');
        const response = await fetch('/view/templates/home.html', {cache: 'no-store'});
        viewWrapper.innerHTML = await response.text();

        const model = this.controller.model;

        // Balance 
        viewWrapper.querySelector('#balance').innerHTML = `Balance: $${model.balance}`;

        // Key and checkbox
        viewWrapper.querySelector('#key').innerHTML = `${model.showKey ? model.key : '?'}`;
        viewWrapper.querySelector('input[type="checkbox"]').checked = model.showKey;


        return viewWrapper;
    }

    attachEvents() {

        document.querySelector('input[type="checkbox"]').onchange = this.controller.onChangeShowKey;
        
        const radioButtonsOddEven = document.querySelectorAll('input[name="bet-odd-even"]');
        for (let i = 0; i < radioButtonsOddEven.length; i++) {
            radioButtonsOddEven[i].onchange = this.controller.onChangeBetOddEven;
        }

        const radioButtonsRange = document.querySelectorAll('input[name="bet-range"]');
        for (let i = 0; i < radioButtonsRange.length; i++) {
            radioButtonsRange[i].onchange = this.controller.onChangeBetRange;
        }
    }

    async onLeave() {
        if(!currentUser) {
            this.parentElement.innerHTML = '<h1>Access denied</h1>'; 
            return;
        }
        console.log('HomeView.onLeave() called');
    }
}