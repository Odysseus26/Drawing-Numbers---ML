const fs = require("fs")
const history = require("./Input.json").history
const Output = require("./Output.json")

let data = {}
for(let i=0;i<10;i++) data[i] = require(`../Graph_Info/${i}.json`).data.split("#")

//mouse-clicks , data-length , x-change, y -change
function grab(set,axis1,axis2){
    set = set.split(",")
    function pick(topic){
        let topics = ["mouse-clicks","data-length","x-change","y-change"]
        for(let i=0;i<topics.length;i++) if(topic==topics[i]) return set[i]
        console.log(topic)
        throw "ERROR - Topic Mismatch with "
    }
    return [pick(axis1.toLowerCase()),pick(axis2.toLowerCase())]
}

/* let answers = []

for(let key in data){
    if(data[key][0]=='') continue
    for(let i=0;i<data[key].length;i++){
        answers.push(key+","+grab(data[key][i]).join(","))
    }
}

console.log("")
console.log(answers.join("#"))
console.log("") */

function getAnswers(axis1,axis2){
    let answers = []
    for(let key in data){
        for(let i=0;i<data[key].length;i++){
            if(data[key][0]=='') continue
            answers.push(key+","+grab(data[key][i],axis1.toLowerCase(),axis2.toLowerCase()).join(","))
        }
    }
    return axis1+","+axis2+"?"+answers.join("#")
}

let final = []
for(let i=0;i<history.length;i++){
    let answer = getAnswers(history[i][0],history[i][1])
    final.push(answer)
}

final = final.join("|")

console.log("Program Executed\n")

fs.writeFileSync("./Output.json",`{
    "results":"${final}"
}`,(err)=>console.log(err))