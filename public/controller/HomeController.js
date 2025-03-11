import { HomeModel } from "../model/HomeModel.js";

export const glHomeModel = new HomeModel();

export class HomeController {
    model = null;
    view = null;

    constructor() {
        this.model = glHomeModel;
        this.onChangeShowKey = this.onChangeShowKey.bind(this);
        this.onChangeBetOddEven = this.onChangeBetOddEven.bind(this);
        this.onChangeBetRange = this.onChangeBetRange.bind(this);
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
        this.view.render();
    }
}