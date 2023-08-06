const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({

    name :{
        type : String,
        require: true
    },
    phone :{
        type : Number,
        require : true
    }
});

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;