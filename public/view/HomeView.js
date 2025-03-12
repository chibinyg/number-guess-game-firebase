import { AbstractView } from "./AbstractView.js";
import { currentUser } from "../controller/firebase_auth.js";
import { GameState } from "../model/HomeModel.js";

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

        // balance 
        viewWrapper.querySelector('#balance').innerHTML = `Balance: $${model.balance}`;

        // checkbox
        viewWrapper.querySelector('input[type="checkbox"]').checked = model.showKey;

        // showKey
        viewWrapper.querySelector('#showKey').innerHTML = `${model.showKey ? `Game Key: ${model.key}` : ''}`;

        // game progress message
        viewWrapper.querySelector('#message').innerHTML = model.progressMessage;

        // odd/even radio buttons
        const radioButtonsOddEven = viewWrapper.querySelectorAll('input[name="bet-odd-even"]');
        for (let i = 0; i < radioButtonsOddEven.length; i++) {
            radioButtonsOddEven[i].checked = radioButtonsOddEven[i].value === model.betOnOddEven;
        }

        // odd/even amount dropdown, show selected amount if betOnOddEvenAmount is not null
        if(model.betOnOddEvenAmount != null) {
            viewWrapper.querySelector('#dropdown-odd-even-amount').textContent = `$${model.betOnOddEvenAmount}`;
        }

        // range radio buttons
        const radioButtonsRange = viewWrapper.querySelectorAll('input[name="bet-range"]');
        for (let i = 0; i < radioButtonsRange.length; i++) {
            radioButtonsRange[i].checked = radioButtonsRange[i].value === model.betOnRange;
        }

        // range amount dropdown, show selected amount if betOnRangeAmount is not null
        if(model.betOnRangeAmount != null) {
            viewWrapper.querySelector('#dropdown-range-amount').innerHTML = `$${model.betOnRangeAmount}`;
        }

        switch (model.gameState) {
            case GameState.INIT:
                viewWrapper.querySelector('#button-play-game').disabled = true;
                viewWrapper.querySelector('#button-new-game').disabled = true;
                break;
            case GameState.PLAYING:
                viewWrapper.querySelector('#button-play-game').disabled = false;
                viewWrapper.querySelector('#button-new-game').disabled = true;
                break;
            case GameState.DONE:
                viewWrapper.querySelector('#button-play-game').disabled = true;
                viewWrapper.querySelector('#button-new-game').disabled = false;
                radioButtonsOddEven.forEach(radio => radio.disabled = true);
                radioButtonsRange.forEach(radio => radio.disabled = true);
                // disable dropdowns
                viewWrapper.querySelector('#dropdown-odd-even-amount').disabled = true;
                viewWrapper.querySelector('#dropdown-range-amount').disabled = true;
                // show key
                viewWrapper.querySelector('#key').innerHTML = `${model.key}`;
                break;
        }
        
        return viewWrapper;
    }

    attachEvents() {
        // check box event
        document.querySelector('input[type="checkbox"]').onchange = this.controller.onChangeShowKey;

        // odd/even radio buttons
        const radioButtonsOddEven = document.querySelectorAll('input[name="bet-odd-even"]');
        for (let i = 0; i < radioButtonsOddEven.length; i++) {
            radioButtonsOddEven[i].onchange = this.controller.onChangeBetOddEven;
        }

        // odd/even amount dropdown
        const dropdownOddEvenItems = document.querySelector('#dropdown-odd-even-amount-items');
        dropdownOddEvenItems.addEventListener('click', (e) => {
            this.controller.onChangeBetOddEvenAmount(e.target.getAttribute('data-value'));
        });

        // range radio buttons
        const radioButtonsRange = document.querySelectorAll('input[name="bet-range"]');
        for (let i = 0; i < radioButtonsRange.length; i++) {
            radioButtonsRange[i].onchange = this.controller.onChangeBetRange;
        }

        // range amount dropdown
        const dropdownRangeItems = document.querySelector('#dropdown-range-amount-items');
        dropdownRangeItems.addEventListener('click', (e) => {
            this.controller.onChangeBetRangeAmount(e.target.getAttribute('data-value'));
        });

        // play button
        document.getElementById('button-play-game').onclick = this.controller.onClickPlayGameButton;

        // new game button
        document.getElementById('button-new-game').onclick = this.controller.onClickNewGameButton;
    }

    async onLeave() {
        if(!currentUser) {
            this.parentElement.innerHTML = '<h1>Access denied</h1>'; 
            return;
        }
        console.log('HomeView.onLeave() called');
    }
}