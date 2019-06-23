class Monthscreen {
    constructor(containerElement) {
        // TODO(you): Implement the constructor and add fields as necessary.
        this.containerElement = containerElement;

        this.monthinput = 6 ;
        this.dayinput;
        this.test ;

        this.scheduleGET = this.scheduleGET.bind(this);

        this.scheduleGET();

        this.getSubmit = this.getSubmit.bind(this);
        //this.send = document.querySelector('#search');
        //this.send.addEventListener('submit', this.getSubmit);


    }
    // TODO(you): Add methods as necessary.


    async scheduleGET(event){

        document.querySelector('.waiting-block').classList.remove('inactive');

        const response = await fetch("/api", {method: "GET"});
        const json = await response.json();

        console.log(json);

        //const day = '#' + 'test' + json[0].day ;
        let cnt ;

        const date = document.querySelectorAll('.flex-item');

        for(let i=0 ; i < 7 ; i++)
        {
            if(date[i].id === ('test' + json[0].day) )
            {
                console.log('testyes');
                date[i].innerHTML = json[0].date ;

                if(json[0].free === '1')
                {
                    date[i].classList.add('flex-free');
                    console.log('testcolor');
                }
                else
                    date[i].classList.remove('flex-free');

                date[i].classList.add('block');

                cnt = i ;
                break ;
            }
        }

        for(let i=cnt+1 ; i < cnt + json.length  ; i++ )
        {
            if(json[i-cnt].free === '1')
            {
                date[i].classList.add('flex-free');
            }
            else
                date[i].classList.remove('flex-free');

            date[i].innerHTML = json[i-cnt].date ;
            date[i].classList.add('block');
        }

        this.test = document.querySelectorAll('.block');

        for(let i=0 ; i < this.test.length ; i++)
        {
            this.test[i].addEventListener('click',this.getSubmit);
        }

        document.querySelector('.waiting-block').classList.add('inactive');
    }

    show() {
        this.containerElement.classList.remove('inactive');
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }

    getSubmit(event) {
        event.preventDefault();
        //this.monthinput = document.querySelector('#month').value;
        //this.dayinput = document.querySelector('#day').value;

        this.dayinput = event.target.innerHTML ;

        console.log("click");
        console.log(this.dayinput);
        console.log(event);

        let search = new CustomEvent("search",{detail:{Month : this.monthinput , Day : this.dayinput}});
        document.dispatchEvent(search);

    }


}