const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const {SportsController} = require('./models/sport-model')
const { DATABASE_URL, PORT } = require( './config' );


const app = express();


/* Your code goes here */
app.delete('/sports/delete', jsonParser, (req, res) =>{

    let id = req.query.sportId;
    let id2 = req.body.id;

    if(!id2){
        res.statusMessage ="There is no id on the body of the request";
        return res.status(406).end();
    }
    if(!id){
        res.statusMessage ="There is no id on the parameters";
        return res.status(406).end();
    }

    if(id != id2){
        res.statusMessage = `The id on the body and the parameters dont match`;
        return res.status(409).end();
    }


    SportController
        .remove(id)
        .then( result => {
            return res.status(204);
        })
        .catch(error =>{
            console.log(error);
            return res.status(500);
        })

})


app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});