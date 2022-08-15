const fs = require('fs');
const express = require('express');
const cors = require('cors');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors({
    origin:'*'
}));

app.get('/',(req,res)=>{
    res.end('<h1>Welcome ...</h1>')
});

app.post('/updateTranslation',(req,res)=>{
    let parentKey=req.body.parentKey;
    let key = req.body.key;
    let value = req.body.value;
    let path = req.body.path;
    readJsonFile(path,updateJsonFile,parentKey,key,value);
    res.statusCode = 200;
    res.end("Translation Added Successfully");
    // if(readJsonFile(path,updateJsonFile,parentKey,key,value)){
    //     res.statusCode = 200;
    //     res.end("Translation Added Successfully");
    // }
    // else{
    //     res.statusCode = 304;
    //     res.end("Unable to Add Translation");
    // }
});

app.listen(8080,()=>{
    console.log("The Server started at http://localhost:8080");
});

function readJsonFile(path,updateJsonFile,parentKey,key,value){
    fs.readFile(path,'utf-8',(err,jsonString)=>{
        if(err){
            console.log("Unable to read the file");
            updateJsonFile(err);
            return false;
        }
        else{
            try{
                let jsonObject = JSON.parse(jsonString);
                updateJsonFile(null,jsonObject,path,parentKey,key,value);
                return true;
            }
            catch(err){
                console.log("Unable to parse the jsonString properly ");
                updateJsonFile(err);
                return false;
            }
        }
    });
}

function updateJsonFile(err,jsonData,path,parentKey,key,value){
    if(err){  
        console.log(err);      
        return;
    }
    try{
        if(value === ""){
            value = {};
        }
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
        });
    }
    catch(error){
        console.log("Unable to convert to JSON String ",error);
    }
}

function addTranslation(jsonData,currentParentKey,parentKey,key,value){
    if(key==="")return false;
    if(currentParentKey === parentKey || parentKey === ""){
        jsonData[key]=value;
        return true;
    }
    for(let obj in jsonData){
        if(obj === '0') break;
        if(addTranslation(jsonData[obj],obj,parentKey,key,value)){
            return true;
        }
    }
    return false;
}
