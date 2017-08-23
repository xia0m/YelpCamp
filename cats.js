var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app",{useMongoClient:true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament:String
});

var Cat = mongoose.model("Cat",catSchema);

// var george = new Cat({
//     name:"Mrs. Norris",
//     age:7,
//     temperament:"Evil"
// });

// george.save(function(err,cat){
//     if(err){
//         console.log("Something went wrong");
//     } else {
//         console.log("We just saved a cat ");
//         console.log(cat);
//     }

// });

Cat.find({},function(err,cats){
    if(err){
        console.log("oh,no error");
        console.log(err);
    } else {
        console.log("all the CATs...")
        console.log(cats);
    }
});

Cat.create({
    name:"Snow White",
    age:15,
    temperament:"Bland"
},function(err,cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});

Cat.remove({name:"Snow White"},function(err,cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});