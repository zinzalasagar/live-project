const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/batch6');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'db not connected'));

db.once('open',function(err){
    if(err){
        console.log("Db not opened");
    }

    console.log("db is connected");
});

module.exports = db;