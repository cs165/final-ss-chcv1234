class Dayscreen {
    constructor(containerElement) {
        // TODO(you): Implement the constructor and add fields as necessary.
        this.containerElement = containerElement;
        this.monthinput ;
        this.dayinput;
        this.timebar ;
        this.eventbar ;

        this.onSubmit = this.onSubmit.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.backto = this.backto.bind(this);
        this.preDelete = this.preDelete.bind(this);

        this.goBack = document.querySelector('#back');
        this.goBack.addEventListener('click' , this.backto);

        this.add = document.querySelector('#update');
        this.add.addEventListener('submit' , this.updateEvent);
    }
    // TODO(you): Add methods as necessary.

    async onSubmit(Month,Day){
        //event.preventDefault();

        const options = {method: "GET"} ;

        const bodyobj = {} ;
        this.monthinput = Month ;
        this.dayinput = Day;
        const path = "/api/" + this.monthinput + "/" + this.dayinput ;

        const response = await fetch(path, options);
        const json = await response.json();

        const cnt = 0 ;

        console.log('get2');
        console.log(json);


        this.timebar = document.querySelectorAll('.hour');
        this.eventbar = document.querySelectorAll('.hourevent');

        for(let i=0 ; i<24 ; i++)
        {
            this.timebar[i].innerHTML = i + ':00';

            if(!json[0][i])
            {
                this.eventbar[i].innerHTML = '' ;
            }
            else
            {
                this.eventbar[i].innerHTML = json[0][i] ;
            }

        }


        //timebar[0].innerHTML = json[0][0] ;
    }

    async updateEvent(event){

        event.preventDefault();

        const options = {method: "POST"} ;

        const bodyobj = {} ;
        //const monthinput = document.querySelector('#monthadd').value;
        //const dayinput = document.querySelector('#dayadd').value;
        const timeinput = document.querySelector('#timeadd').value;
        const eventinput = document.querySelector('#event').value;
        const path = "/api/" + this.monthinput + "/" + this.dayinput ;

        bodyobj[timeinput] = eventinput ;

        options.body = JSON.stringify(bodyobj);
        options.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        document.querySelector('.waiting-block').classList.remove('inactive');

        const response = await fetch(path, options);

        console.log('post');
        console.log(options);


        let wait = await this.onSubmit(this.monthinput,this.dayinput);
        document.querySelector('.waiting-block').classList.add('inactive');

        document.getElementById("daily").scrollIntoView({behavior: "smooth" , block: "start"});
    }

    backto() {
        let backmenu = new CustomEvent("backmenu");
        document.dispatchEvent(backmenu);
    }

    preDelete(){

        for(let i=0 ; i<24 ; i++)
        {
            this.timebar[i].innerHTML = '';

            this.eventbar[i].innerHTML = '' ;
        }

    }

    show() {
        this.containerElement.classList.remove('inactive');
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }
}