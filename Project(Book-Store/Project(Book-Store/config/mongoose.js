const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hk');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'db no connect'));

db.once('open',function(error){
    if(error){
        console.log("DB is not opened !! something wrong to open DB");
        return false;
    }
    console.log("DB is Connected");
});

module.exports = db;