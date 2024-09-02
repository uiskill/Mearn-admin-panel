const mongoose = require('mongoose');

const mongodb= "mongodb+srv://swatikhilari1985:YFaBUnpDFcXoC8ae@cluster0.hv8v13e.mongodb.net/suadmin?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = () =>{
    mongoose.connect(mongodb);
    console.log("connected");
}

module.exports = connectToMongo;