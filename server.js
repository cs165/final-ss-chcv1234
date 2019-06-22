const express = require('express');
const bodyParser = require('body-parser');
const googleSheets = require('gsa-sheets');

// TODO(you): Update the contents of privateSettings accordingly, as you did
// in HW5, then uncomment this line.
 const key = require('./privateSettings.json');

// TODO(you): Change the value of this string to the spreadsheet id for your
// GSA spreadsheet, as you did in HW5, then uncomment these lines.
 const SPREADSHEET_ID = '1YoE1cOMmCFy_gLXIydN_R0aOG54nRMg-1vcawKlEgeo';
 const sheet = googleSheets(key.client_email, key.private_key, SPREADSHEET_ID);

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

// TODO(you): Add at least 1 GET route and 1 POST route.
async function onGet(req, res) {
    const result = await sheet.getRows();
    const rows = result.rows;
    console.log(rows);

    var array = [] ;

    // TODO(you): Finish onGet.
    for(let i=1 ; i < rows.length; i++)
    {
        let line = {} ;

        for(let j=0 ; j< 4; j++)
        {
            line[rows[0][j]] = rows[i][j] ;
        }

        array.push(line);

        console.log(array);
        console.log(line);
    }
    //res.json( { status: 'unimplemented!!!'} );
    res.json(array);
}
app.get('/api', onGet);

async function onGet2(req, res) {

    const result = await sheet.getRows();
    const rows = result.rows;
    const column  = req.params.column;
    const value  = req.params.value;
    //console.log(rows);

    var array = [] ;

    console.log(column + "------" + value);

    // TODO(you): Finish onGet.
    let line = {} ;

    for(let i=1 ; i < rows.length; i++)
    {

        if( rows[i][0] === column && rows[i][1] === value)
        {
            for(let j=0 ; j< rows[0].length; j++)
            {
                line[rows[0][j]] = rows[i][j] ;
            }
        }


    }

    array.push(line);

    console.log(array);
    console.log(line);


    //res.json( { status: 'unimplemented!!!'} );
    res.json(array);
}
app.get('/api/:column/:value', onGet2);

/*
async function onPost(req, res) {
    const messageBody = req.body;

    const keyinput = Object.keys(messageBody);
    const valueinput = Object.values(messageBody);

    const result = await sheet.getRows();
    const rows = result.rows;

    var postrow = [] ;

    let n = 0 ;

    const date = keyinput.split() ;

    // TODO(you): Implement onPost.

    //NOT COMPLETE

    console.log(keyinput);
    console.log(valueinput);

    while( n < keyinput.length)
    {
        for(let i=0 ; i<rows[0].length; i++)
        {
            if(rows[0][i] === keyinput[n])
            {
                postrow[i] = valueinput[n];
                n++ ;
            }
        }
    }

    await sheet.appendRow(postrow);
    res.json({"response": "success"});

    //res.json( { status: 'unimplemented'} );
}
app.post('/api', jsonParser, onPost);
*/

async function onPost(req, res) {
    const column  = req.params.column;
    const value  = req.params.value;
    const messageBody = req.body;

    const keyinput = Object.keys(messageBody);
    const valueinput = Object.values(messageBody);

    const result = await sheet.getRows();
    const rows = result.rows;

    let beupdate1 ;
    let beupdate2 ;
    let n=0 ;
    var patchrow = [] ;

    // TODO(you): Implement onPatch.

    for(let i=1 ; i<rows.length; i++)
    {
        if( rows[i][0] === column && rows[i][1] === value)
        {
            beupdate2 = i ;
            patchrow[0] = column;
            patchrow[1] = value;
            break ;
        }
    }

    for(let i=4 ; i<rows[0].length; i++)
    {
        if(rows[0][i] === keyinput[0])
        {
            if(valueinput[0] === '')
            {
                patchrow[i] = null ;

            }
            else
            {
                patchrow[i] = valueinput[0] ;
            }

        }
        else
        {
            patchrow[i] = rows[beupdate2][i] ;
        }

        console.log(patchrow[i]);
        console.log("--------------");

    }

    for(let i=4 ; i<patchrow.length ; i++)
    {
        if(!patchrow[i])
        {
            n = 0 ;
        }
        else
        {
            n = 1 ;
            break ;
        }
    }

    for(let i=4 ; i<patchrow.length ; i++)
    {
        console.log(i + ' ' + patchrow[i]) ;

        if(!patchrow[i])
        {
            patchrow[i] = '' ;
        }
    }


    patchrow[2] = rows[beupdate2][2] ;

    if( n === 1)
    {
        patchrow[3] = 1 ;
    }
    else if(n === 0)
    {
        patchrow[3] = 0 ;
    }

    console.log(patchrow);

    await sheet.setRow(beupdate2 , patchrow);
    res.json({"response": "success" });

    //res.json( { status: 'unimplemented'} );
}
app.post('/api/:column/:value', jsonParser, onPost);

// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
