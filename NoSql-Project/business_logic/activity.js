
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";
let methods = require("./generate")

function insert(data) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("local_db");
        //QUERY
        dbo.collection("movies").insertMany(data, function(err, res) {
            if (err) throw err;
            db.close();
        });
    });
    return "success"
}

function rating(gpercentage,lpercentage){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("local_db");
        //QUERY
        dbo.collection("movies").find({ "Rotten Tomatoes" : { $gte : gpercentage , $lte : lpercentage }}).toArray(function(err, result) {
            if (err) throw err;
            methods.writeContent(result,"rating");
            db.close();
        });
    });
    return "success"
}


function lang(lang,gRating){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("local_db");
        //QUERY
        dbo.collection("movies").find({ "Language":lang, "IMDb" : { $gte : parseInt(gRating) }}).toArray(function(err, result) {
            if (err) throw err;
            methods.writeContent(result,"lang");

            db.close();
        });
    });
    return "success"
}

function movieanddir(gYear, lYear, ratings,tRatings)
{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("local_db");
        //QUERY
        dbo.collection("movies").find( {"Year" : { $gte : parseInt(gYear) , $lte : parseInt(lYear) },"IMDb" : { $gte : parseInt(ratings) } ,"Rotten Tomatoes" : { $gte : tRatings }}).toArray(function(err, result) {
            if (err) throw err;
            let final = [];
            for(let i=0; i<result.length; i++){
                let out = Object.assign({},{"movieName":result[i]["Title"], "directorName" : result[i]["Directors"]})

                final.push(out);
            }

           methods.writeContent(final,"movieanddir");
            db.close();
        });
    });
}

function genre(query){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("local_db");
        //QUERY
        dbo.collection("movies").find(query ).toArray(function(err, result) {
            if (err) throw err;
            methods.writeContent(result,"genre");
            db.close();
        });
    });
}

module.exports = {insert,rating,lang,movieanddir,genre}