const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const bookSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    price :{
        type : Number,
        require : true
    },
    quantity :{
        type  : String,
        require : true
    },
    type :{
        type : Array,
        require : true
    },
    edition :{
        type : String,
        require : true
    }
});

const Book = mongoose.model('book',bookSchema);

module.exports = Book;