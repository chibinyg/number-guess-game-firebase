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

    onChangeBetRange(e) {
        // console.log('HomeController.onChangeBetRange() called', e.target.value);
        this.model.betOnRange = e.target.value;
    }
}