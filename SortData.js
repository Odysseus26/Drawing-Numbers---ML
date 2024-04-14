const fs = require("fs")
const stream = fs.readdirSync("./Data")
const analyze = require("./brain.js").analyze



let datas = {}
for(let i=0;i<10;i++){
    datas[i] = require(`./Graph_Info/${i}.json`).data.split("#")
    if(datas[i][0]=='') datas[i].shift();
}
//mouse-clicks , data-length , x-change, y -change 
for(let i=0;i<stream.length;i++){
    let oldPath = `./Data/${stream[i]}`
    let file = require(oldPath)
    let is_what = file.is_what;
    for(let a=0;a<is_what.length;a++){
        let drawing = file.drawings[a+1];
        let result = analyze(drawing),order = result["mouse-clicks"]+","+result["data-length"]+","+result["x-change"]+","+result["y-change"]
        datas[is_what[a]].push(order)
    }
    fs.rename(oldPath,`./Archived_Data/${stream[i]}`,(err)=>console.log(err))
}

for(let i=0;i<9;i++){
    let checker = new Map(),install = [];
    for(let a=0;a<datas[i].length;a++){
        if(checker.has(datas[i][a])) continue
        checker.set(datas[i][a])
        install.push(datas[i][a])
    }
    datas[i] = install
}

for(let i=0;i<10;i++){
    fs.writeFileSync(`./Graph_Info/${i}.json`,`{
        "data":"${datas[i].join("#")}"
    }`,(err)=>console.log(err))
}
