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

    const send = document.querySelector('form');
    send.addEventListener('submit', onSubmit);

   sheculeGET();

})();