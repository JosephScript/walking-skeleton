var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost/basic_walking_skeleton');

var Cat = mongoose.model('Cat', { name: String });

router.get('/', function(req,res,next){
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/cats',function(req,res,next){
    return Cat.find({}).exec(function(err, cats){
        if(err) {
            throw err;
        } else{
            res.send(JSON.stringify(cats));
            next();
        }
    });
});

router.post('/add', function(req,res,next){
    console.log('/add');
    var kitty = new Cat({ name: req.body.name });
    kitty.save(function(err){
        if (err){
            console.log(err);
        } else{
            console.log('Sending:', kitty.toJSON);
            res.send(kitty.toJSON());
            next();
        }
    });
});

module.exports = router;