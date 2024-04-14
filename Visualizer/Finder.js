const fs = require("fs")
let results = require("./Output.json").results.split("|")
const analyze = require("../brain.js").analyze
let table = fs.readdirSync("./Guess")
let readings = require("./Input.json").history
for(let el in readings) for(let each in readings[el]) readings[el][each] = readings[el][each].toLowerCase()

let searchEngine = new Map()
for(let i=0;i<results.length;i++){
    let data = results[i].split("?")[1].split("#")
    searchEngine.set(readings[i],data)
}

function quickRead(mess){
    mess = mess.split(",")
    return {
        "number":mess[0],
        "x-value":mess[1],
        "y-value":mess[2]
    }
}

function distance(x1,y1,x2,y2){
    return Math.sqrt((x1-x2)**2+(y1-y2)**2)
}

function findClosest(start,what_is_it){
    let data = analyze(start),allGuess = [],Grapher = {}
    for(let i=0;i<readings.length;i++){
        let trial = [data[readings[i][0]],data[readings[i][1]]]
        let compareTo = searchEngine.get(readings[i])
        let distances = []
        for(let a=0;a<compareTo.length;a++){
            let pastCase = quickRead(compareTo[a])
            distances.push(distance(trial[0],trial[1],pastCase["x-value"],pastCase["y-value"]))
        }
        let smallestCase = Infinity,smallPlaces = []
        for(let a=0;a<distances.length;a++) smallestCase = (distances[a]<smallestCase)?distances[a]:smallestCase
        for(let a=0;a<distances.length;a++){
            if(distances[a]==smallestCase) smallPlaces.push(a)
        }
        for(let a=0;a<smallPlaces.length;a++) allGuess.push(quickRead(compareTo[smallPlaces[a]]).number)
    }
    for(let i=0;i<10;i++) Grapher[String(i)] = 0;
    for(let i=0;i<allGuess.length;i++) Grapher[allGuess[i]] += 1
    for(let key in Grapher){
        if(Grapher[key]==0){
            delete Grapher[key]
            continue
        }
        Grapher[key] /= allGuess.length
    }
    let highestCase = 0,Honor = []
    for(let key in Grapher) highestCase = (Grapher[key]>highestCase)?Grapher[key]:highestCase
    for(let key in Grapher) if(Grapher[key]==highestCase) Honor.push(key)
    let text = []
    for(let key in Grapher) text.push(`There is a ${Grapher[key]*100}% chance that the number is ${key}`)
    console.log(text.join("\n"))
    if(Honor.length==1){
        if(Honor[0]==what_is_it) console.log("Match Confirmed!")
        else console.log(`Match not made! Results:${Honor[0]}  Answer:${what_is_it} | Solution not captured!`)
    }
    else{
        for(let i=0;i<Honor.length;i++){
            if(Honor[i]==what_is_it){
                console.log("Solution was captured in the Interval, but other solutions were found")
                break
            }
        }
    
    }
}

table.shift()
for(let i=0;i<table.length;i++){
    let file = require(`./Guess/${table[i]}`)
    for(let a=0;a<file.is_what.length;a++){
        let this_data = file.drawings[String(a+1)]
        findClosest(this_data,file.is_what[a])
        console.log(`Answer:${file.is_what[a]}\n`)
    }
}
console.log(table)
