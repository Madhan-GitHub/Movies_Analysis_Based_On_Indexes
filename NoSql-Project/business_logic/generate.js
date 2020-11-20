

'use strict';

const fs = require('fs');


function writeContent(data,file_name){
    let out = JSON.stringify(data, null, 2);
    console.log(typeof (out))
    fs.writeFileSync('output/'+file_name+'.json', out);
    console.log("FILE GENERATED ... ! /output/"+file_name+".json")
    return "success"
}

module.exports = {writeContent}