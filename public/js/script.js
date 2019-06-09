//
// TODO(you): Add the JavaScript necessary to complete your final project.
//
(() => {
    async function onSubmit(event){
        event.preventDefault();
        const response = await fetch("/api", {method: "GET"});
        const json = await response.json();

        const cnt = 0 ;

        console.log(json);

        const date = document.querySelector('#test1');
        date.innerHTML = json[0].date ;

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
                cnt = i ;
                break ;
            }
        }

        for(let i=cnt+1 ; i < cnt + json.length  ; i++ )
        {
            date[i].innerHTML = json[i-cnt].date ;
        }

    }

    const send = document.querySelector('#test');
    send.addEventListener('click', onSubmit);

   sheculeGET();

})();