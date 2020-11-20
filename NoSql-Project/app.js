const fs = require('fs');
const methods = require("./business_logic/activity")

//npx run-func app.js insertAll movies.json
function insertAll(file) {
    let rawdata = fs.readFileSync(file);
    let data = JSON.parse(rawdata);
    methods.insert(data);

    console.log("done")
    return "success";
}



// npx run-func app.js getRatings ratingAbove:80% ratingbelow:90%
function getRatings(query1,query2) {
    let gpercentage = query1.split(":")[1];
    let lpercentage = query2.split(":")[1];
    methods.rating(gpercentage,lpercentage);
    console.log("done")
    return "success";
}


// npx run-func app.js langRatingFilter Italian 8 ratings above

function langRatingFilter(lang,gRating) {
    methods.lang(lang,gRating);
    console.log("done")
    return "success";
}

// start:2000,end:2010 ratingsabove:8 rottenTomatoesRating:80%
function getMoviesandDir(query1,query2,query3){
    let years = query1.split(",");
    let gYear = years[0].split(":")[1];
    let lYear = years[1].split(":")[1];
    let ratings = query2.split(":")[1];
    let tRatings = query3.split(":")[1];
    methods.movieanddir(gYear, lYear, ratings,tRatings)

    return "success";
}

//npx run-func app.js genreFilter genre:Action platform:Netflix runtime_lessThan:100
function genreFilter(query1,query2,query3){

    let genres = query1.split(":")[1];
    let ott_platform = query2.split(":")[1];
    let runtime = query3.split(":")[1];
    let query = { "Genres":genres, "Runtime" : { $lte : parseInt(runtime) } };
    query[ott_platform] = 1;
    console.log(query)
    methods.genre(query)
    console.log("done")
    return "success";

}



module.exports = {
    insertAll,getRatings,langRatingFilter,getMoviesandDir,genreFilter
}


