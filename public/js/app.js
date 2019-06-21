class App {
    constructor() {
        // TODO(you): Implement the constructor and add fields as necessary.
        this.monthElement = document.querySelector('#monthly');
        this.month = new Monthscreen(this.monthElement);

        this.dayElement = document.querySelector('#daily');
        this.day = new Dayscreen(this.dayElement);

        this.showDay = this.showDay.bind(this);
        document.addEventListener('search',this.showDay);

        this.Return = this.Return.bind(this);
        document.addEventListener('backmenu',this.Return)
    }
    // TODO(you): Add methods as necessary.


    showDay(event){

        this.day.onSubmit(event.detail.Month,event.detail.Day);
        this.month.hide();
        this.day.show();

    }

    Return(event){
        this.month.scheduleGET();
        this.day.hide();
        this.month.show();
    }

}