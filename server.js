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

        for(let j=0 ; j< rows[0].length; j++)
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
// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
