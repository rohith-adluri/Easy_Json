function Submit(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:8080/updateTranslation',true);
    xhr.setRequestHeader('Content-Type','application/json;charset=utf-8')
    xhr.onprogress = function(){
        console.log(">>> request is in progress")
    }
    xhr.onload = function(){
        console.log(">>> response text ",xhr.responseText);
    }
    let obj={
        "parentKey":document.getElementById("parentKey").value,
        "key":document.getElementById("key").value,
        "value":document.getElementById("value").value,
        "path":document.getElementById("path").value
    }
    xhr.send(JSON.stringify(obj));
}