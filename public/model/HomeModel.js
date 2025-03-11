export const GameState = {
    PLAYING: 0, DONE: 1
}

export class HomeModel {
    balance;
    key; // random key from 1 - 6
    showKey; // boolean value to show the key
    progressMessage;
    betOnOddEven;
    betOnOddEvenAmount;
    betOnRange;
    betOnRangeAmount;
    gameState = GameState.PLAYING;

    constructor() {
        this.balance = 100;
        this.key = Math.floor(Math.random() * 6) + 1;
        this.showKey = false;
        this.progressMessage = 'Choose bet(s) and press [PLAY]';
        this.betOnOddEven = 'odd';
        this.betOnOddEvenAmount = null;
        this.betOnRange = '1-2';
        this.betOnRangeAmount = null;
    }

    playGame() {
        
    }

    newGame() {
        this.key = Math.floor(Math.random() * 6) + 1;
        this.showKey = false;
        this.progressMessage = 'Choose bet(s) and press [PLAY]';
        this.gameState = GameState.PLAYING;
    }

    

   

}