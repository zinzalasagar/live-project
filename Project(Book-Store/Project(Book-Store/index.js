const { urlencoded } = require('express');
const express = require ('express');

const port = 8001;

const app = express();

const path = require('path');

const db = require('./config/mongoose');
const bookList = require('./models/book');

app.set('view engine','ejs');
app.set('views', path.join(__dirname,"views"));


app.use(urlencoded());

app.use(express.static('assets'));

app.use(function(req,res,next){
    console.log("middleware is running");
    next();
});

app.get('/updateRecord', function(req,res){
    var book_id = req.query.book_id;
    bookList.findById(book_id,function(err,record){
        if(err){
            console.log(err);
            return false;
        }
        return res.render('update_index',{
            'single' : record
        })
    });
});

app.post('/editRecord', function(req,res){
    var book_id = req.body.bk_id;
    bookList.findByIdAndUpdate(book_id,{
        'name' : req.body.name,
        'price' : req.body.price,
        'quantity': req.body.quantity,
        'type' : req.body.type,
        'edition' : req.body.edition
        
    },function(err,record){
        if(err){
            console.log("error");
            return false;
        }
        return res.redirect('/');
    })
});

app.get('/deleteRecord/:id', function(req,res){

    var book_id = req.params.id;
    bookList.findByIdAndDelete(book_id,function(err,data){
        if(err){
            console.log(err);
            return false;
        }
        return res.redirect('back');
    })

});

app.get('/', function(req,res){
    bookList.find({},function(error,record){
        res.render('index',{
           'title' : "index page",
           'recordList' : record 
        });
    })
})

app.post('/InsertRecord', function(req,res){

    bookList.create({
        name : req.body.name,
        price : req.body.price,
        quantity : req.body.quantity,
        type : req.body.type,
        edition : req.body.edition
    },function(err,record){
        if(err){
            console.log(err);
        }
        console.log(record);
        return res.redirect('back');
    });

});

app.get('/', function(req,res){
    console.log("Home Page");
    res.render('index',{
        title : "Index page",
        pageName : "Home page",
        record : book
    }) 
}); 

app.listen(port, function(error){
    if(error){
        console.log("Server is not running");
        return false;
    }

    console.log("Server is running on port=" +port);
});