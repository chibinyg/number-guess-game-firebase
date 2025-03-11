export const GameState = {
    INIT: 0, PLAYING: 1, DONE: 2
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
    gameState = GameState.INIT;

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
        // check if balance is enough
        if (this.betOnOddEvenAmount > this.balance || this.betOnRangeAmount > this.balance) {
            this.progressMessage = 'Insufficient balance';
        }

        let oddEvenMessage = '';
        let rangeMessage = '';

        // odd/even bet is chosen and balance is enough, 2x winnings
        if(this.betOnOddEvenAmount != null) {
            let winAmount = 0;
            if (this.betOnOddEven === 'odd' && this.key % 2 === 1) {
                winAmount = this.betOnOddEvenAmount * 2;
                oddEvenMessage = `You won $${winAmount} on odd`;
                this.balance += winAmount;
            } else if (this.betOnOddEven === 'even' && this.key % 2 === 0) {
                winAmount = this.betOnOddEvenAmount * 2;
                this.balance += winAmount;
                oddEvenMessage = `You won $${winAmount} on even`;
            } else {
                this.balance -= this.betOnOddEvenAmount;
                oddEvenMessage = `You lost $${this.betOnOddEvenAmount} on ${this.betOnOddEven}`;
            }
        } else{
            oddEvenMessage = 'No bet on odd/even';
        }
        
        // range bet is chosen and balance is enough, 3x winnings
        if(this.betOnRangeAmount != null) {
            let winAmount = 0;
            if (this.betOnRange === '1-2' && this.key <= 2) {
                winAmount = this.betOnRangeAmount * 3;
                this.balance += winAmount;
                rangeMessage = `You won $${winAmount} on 1-2`;
            } else if (this.betOnRange === '3-4' && this.key > 2 && this.key <= 4) {
                winAmount = this.betOnRangeAmount * 3;
                this.balance += winAmount;
                rangeMessage = `You won $${winAmount} on 3-4`;
            } else if (this.betOnRange === '5-6' && this.key > 4) {
                winAmount = this.betOnRangeAmount * 3;
                this.balance += winAmount;
                rangeMessage = `You won $${winAmount} on 5-6`;
            } else {
                this.balance -= this.betOnRangeAmount;
                rangeMessage = `You lost $${this.betOnRangeAmount} on ${this.betOnRange}`;
            }
        } else {
            rangeMessage = 'No bet on range';
        }

        // Combine the messages
        this.progressMessage = `${oddEvenMessage}<br>${rangeMessage}`;
    }

    newGame() {
        this.key = Math.floor(Math.random() * 6) + 1;
        this.betOnOddEven = 'odd';
        this.betOnOddEvenAmount = null;
        this.betOnRange = '1-2';
        this.betOnRangeAmount = null;
        this.progressMessage = 'Choose bet(s) and press [PLAY]';
    }
}