const fs = require("fs")

const StdFiles = fs.readdirSync("./Info")
const GraphFiles = fs.readdirSync("./Graph_Info")


for(let i=0;i<StdFiles.length;i++){
    fs.unlink(`./Info/${StdFiles[i]}`,(err)=>console.log(err))
}
for(let i=0;i<GraphFiles.length;i++){
    fs.unlink(`./Graph_Info/${GraphFiles[i]}`,(err)=>console.log(err))
}

for(let i=0;i<10;i++){
    fs.appendFileSync(`./Info/${i}.json`,`{
        "mouse-clicks":0,
        "data-length":0,
        "x-change":0,
        "y-change":0,
        "amount":0
    }`,(err)=>console.log(err))
}

for(let i=0;i<10;i++){
    fs.appendFileSync(`./Graph_Info/${i}.json`,`{
       "data":"" 
    }`,(err)=>console.log(err))
}