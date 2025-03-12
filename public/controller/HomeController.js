import { HomeModel, GameState} from "../model/HomeModel.js";
import { startSpinner, stopSpinner } from "../view/util.js";
import { currentUser } from "./firebase_auth.js";
import { addPlayHistory } from "./firestore_controller.js";

export const glHomeModel = new HomeModel();

export class HomeController {
    model = null;
    view = null;

    constructor() {
        this.model = glHomeModel;
        this.onChangeShowKey = this.onChangeShowKey.bind(this);
        this.onChangeBetOddEven = this.onChangeBetOddEven.bind(this);
        this.onChangeBetRange = this.onChangeBetRange.bind(this);
        this.onClickPlayGameButton = this.onClickPlayGameButton.bind(this);
        this.onClickNewGameButton = this.onClickNewGameButton.bind(this);
   }

   setView(view) {
    this.view = view;
   }

   onChangeShowKey(e) {
    // console.log('HomeController.onChangeShowKey() called', e.target.checked);
    this.model.showKey = e.target.checked;
    this.view.render();
   }

    onChangeBetOddEven(e) {
        // console.log('HomeController.onChangeBetOddEven() called', e.target.value);
        this.model.betOnOddEven = e.target.value;
    }

    onChangeBetOddEvenAmount(e) {
        // console.log('HomeController.onChangeBetOddEvenAmount() called', e);
        if(e == "") {
            this.model.betOnOddEvenAmount = null;
        } else {
            this.model.betOnOddEvenAmount = parseInt(e);
        }
        this.updateGameState();
        this.view.render();
    }

    onChangeBetRange(e) {
        // console.log('HomeController.onChangeBetRange() called', e.target.value);
        this.model.betOnRange = e.target.value;
    }

    onChangeBetRangeAmount(e) {
        // console.log('HomeController.onChangeBetRangeAmount() called', e);
        if (e == "") {
            this.model.betOnRangeAmount = null;
        } else {
            this.model.betOnRangeAmount = parseInt(e);
        }
        this.updateGameState();
        this.view.render();
    }

    async onClickPlayGameButton() {
        // console.log('HomeController.onClickPlayGameButton() called');
        this.model.playGame();
        this.model.gameState = GameState.DONE;
        // save the game record to Firestore
        startSpinner();
        try {
            const history = this.model.toFirestoreObject(currentUser.email);
            await addPlayHistory(history);
            stopSpinner();
        } catch (e) {
            stopSpinner();
            console.error('Error saving game history', e);
            alert('Error saving game history: ' + e);
        }
        this.view.render();
    }

    onClickNewGameButton() {
        // console.log('HomeController.onClickNewGameButton() called');
        this.model.newGame();
        this.model.gameState = GameState.INIT;
        this.view.render();
    }

    // helper function to update game state for dropdown menu
    updateGameState() {
        // If at least one bet amount is selected, set gameState to PLAYING
        if (this.model.betOnOddEvenAmount != null || this.model.betOnRangeAmount != null) {
            this.model.gameState = GameState.PLAYING;
        } else {
            // If both bet amounts are null, set gameState to INIT
            this.model.gameState = GameState.INIT;
        }
    }
}