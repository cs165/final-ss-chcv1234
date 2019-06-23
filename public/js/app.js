class App {
    constructor() {
        // TODO(you): Implement the constructor and add fields as necessary.
        this.daybar = document.querySelector('.day-bar');

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


    async showDay(event){

        document.querySelector('.waiting-block').classList.remove('inactive');

        this.daybar.innerHTML = this.daybar.innerHTML + event.detail.Day ;
        let test = await this.day.onSubmit(event.detail.Month,event.detail.Day);
        this.month.hide();
        this.day.show();
        document.querySelector('.waiting-block').classList.add('inactive');
        document.getElementById("daily").scrollIntoView({behavior: "auto" , block: "start"});

    }

    async Return(event){
        let test = await this.month.scheduleGET();
        this.day.hide();
        this.month.show();
        document.getElementById("monthly").scrollIntoView({behavior: "auto" , block: "start"});
        this.day.preDelete();
        this.daybar.innerHTML = "JUNE / " ;
    }

}