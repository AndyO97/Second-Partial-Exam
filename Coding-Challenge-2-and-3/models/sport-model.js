const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* Your code goes here */
let sportCollection = mongoose.Schema({
    id: uuid.v4(),
    name: String,
    num_players: Number
})

let Sports = mongoose.model('sport', sportCollection);

let SportController = {
    remove: function(id){
        return Sports.findOneAndRemove({id: id})
        .then( result =>{
            return result;
        })
        .catch(error =>{
            throw Error(eror);
        })
    }
}

module.exports = {
    SportController
};