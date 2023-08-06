const { urlencoded } = require('body-parser');
const express = require('express');

const port = 8001;

const server =  express();
const path = require('path');
const db = require('./config/mongoose');
const studenList = require('./models/student');

server.set('view engine','ejs');
server.set('views',path.join(__dirname,"views"));
server.use(urlencoded());
server.use(express.static('assets'));

server.use(function(req,res,next){
    req.username = "sagar";
    console.log("midleware 1 is running");
    next();
});

server.use(function(req,res,next){
    console.log("middleware 2 is running");
    next();
});
// var student = [
//         {
//             name : "keval",
//             phone : 8989898
//         },
//         {
//             name : "vijay",
//             phone : 88888999
//         }
// ]
server.get('/updateData/:phone', function(req,res){
    var phone = req.params.phone;
    var studentIndex = student.findIndex(student => student.phone == phone);
    return res.render('update_index',{
        'single' : student[studentIndex],
    })
});

server.post('/editRecord', function(req,res){
    var phone_up = req.body.update_phone;
    var studentIndex = student.findIndex(student => student.phone == phone_up);
    student[studentIndex].name = req.body.name;
    student[studentIndex].phone = req.body.phone;
    return res.redirect('/');

});

server.get('/deleteData/', function(req,res){
    var phone = req.query.ph;
    var studentIndex = student.findIndex(student => student.phone == phone);
    if(studentIndex != -1){
        student.splice(studentIndex,1);
    }
    return res.redirect('back');
});

server.get('/', function(req,res){
    studenList.find({},function(err,record){

        res.render('index',{
            'title' : "index page",
            'recordList' : record
            
        });
    })
   
});

server.post('/insertRecord', function(req,res){
   studenList.create({
       name : req.body.name,
       phone : req.body.phone
   },function(err,record){
       if(err){
           console.log("record not inserted");
       }
       return res.redirect('back');
   })
    
});

server.listen(port, function(err){
    if(err){
        console.log("server is not running:"+err);
        return false;
    }
    console.log("server is running on port:"+port);
});
