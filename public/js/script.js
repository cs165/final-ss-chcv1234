//
// TODO(you): Add the JavaScript necessary to complete your final project.
//
(() => {
    async function onSubmit(event){
        event.preventDefault();

        const options = {method: "GET"} ;

        const bodyobj = {} ;
        const monthinput = document.querySelector('#month').value;
        const dayinput = document.querySelector('#day').value;
        const path = "/api/" + monthinput + "/" + dayinput ;

        const response = await fetch(path, options);
        const json = await response.json();

        const cnt = 0 ;

        console.log('get2');
        console.log(json);


        const timebar = document.querySelectorAll('.hour');
        const eventbar = document.querySelectorAll('.hourevent');

        for(let i=0 ; i<24 ; i++)
        {
            timebar[i].innerHTML = i + ':00';

            if(!json[0][i])
            {
                eventbar.innerHTML = '' ;
            }
            else
            {
                eventbar[i].innerHTML = json[0][i] ;
            }

        }


        //timebar[0].innerHTML = json[0][0] ;
    }

    /*
    async function PostSubmit(event){
        event.preventDefault();

        const options = {method: "POST"} ;

        const bodyobj = {} ;
        const monthinput = document.querySelector('#monthadd').value;
        const dayinput = document.querySelector('#dayadd').value;
        const timeinput = document.querySelector('#timeadd').value;
        const eventinput = document.querySelector('#event').value;

        bodyobj[monthinput + '/' + dayinput + '/' + timeinput] = eventinput ;

        options.body = JSON.stringify(bodyobj);
        options.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const response = await fetch('/api', options);
        const json = await response.json();

        const cnt = 0 ;

        console.log('post');
        console.log(json);

    }
    */


    async function updateEvent(event){

        event.preventDefault();

        const options = {method: "POST"} ;

        const bodyobj = {} ;
        const monthinput = document.querySelector('#monthadd').value;
        const dayinput = document.querySelector('#dayadd').value;
        const timeinput = document.querySelector('#timeadd').value;
        const eventinput = document.querySelector('#event').value;
        const path = "/api/" + monthinput + "/" + dayinput ;

        bodyobj[timeinput] = eventinput ;

        options.body = JSON.stringify(bodyobj);
        options.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const response = await fetch(path, options);

        console.log('post');
    }

    async function sheculeGET(event){

        const response = await fetch("/api", {method: "GET"});
        const json = await response.json();

        console.log(json);

        //const day = '#' + 'test' + json[0].day ;

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

                cnt = i ;
                break ;
            }
        }

        for(let i=cnt+1 ; i < cnt + json.length  ; i++ )
        {
            if(json[i-cnt].free === 1)
            {
                date[i].classList.add('.flex-free');
            }

            date[i].innerHTML = json[i-cnt].date ;
        }

    }

    const send = document.querySelector('#search');
    send.addEventListener('submit', onSubmit);

    const add = document.querySelector('#update');
    add.addEventListener('submit' , updateEvent);


   sheculeGET();

})();