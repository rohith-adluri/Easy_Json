const fs = require('fs');
let parentKey="name";
const key = "language";
const value = "javascript";
let path = "./en.json";

readJsonFile(path,updateJsonFile);

let currentParentKey =parentKey;
function readJsonFile(path,updateJsonFile){
    fs.readFile(path,'utf-8',(err,jsonString)=>{
        if(err){
            console.log("Unable to read the file");
            return updateJsonFile(err);
        }
        else{
            try{
                let jsonObject = JSON.parse(jsonString);
                return updateJsonFile && updateJsonFile(null,jsonObject);
            }
            catch(err){
                console.log("Unable to parse the jsonString properly ");
                return updateJsonFile && updateJsonFile(err);
            }
        }
    })
}

function updateJsonFile(err,jsonData){
    if(err){  
        console.log(err);      
        return;
    }
    try{
        if(!addTranslation(jsonData,null,parentKey,key,value)){
            console.log("Unable to find the key");
            return;
        }
        let jsonString = JSON.stringify(jsonData,null,2);
        fs.writeFile(path,jsonString,error=>{
            if(error){
                console.log(error);
                return;
            }
            console.log("Written to file Successfully");
        })
    }
    catch(error){
        console.log("Unable to convert to JSON String ",error);
    }
}

function addTranslation(jsonData,currentParentKey,parentKey,key,value){
    if(key===""||value==="")return false;
    if(currentParentKey === parentKey){
        jsonData[key]=value;
        return true;
    }
    for(let obj in jsonData){
        if(obj === '0'){
            break;
        }
        if(addTranslation(jsonData[obj],obj,parentKey,key,value)){
            return true;
        }
    }
    return false;
}

