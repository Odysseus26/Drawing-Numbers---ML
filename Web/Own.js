let data = {
    is_what:[],
    session:new Date().getTime(),
    drawings:{}
}
let counter = 0,saved = 0

let the_number = null

function randomNum(){
    let hold = document.getElementById("random_num")
    the_number = Math.floor(Math.random()*10)
    let statement = "Enter the Random Number: "+the_number
    hold.innerHTML = statement
    return statement
}

window.onload = function(){
    randomNum()
}


function start(){
    //if(student.value==""||sketchPad.paths.length==0){
    if(false){
        alert("Enter What it is!")
    }
    else{
        student.value = the_number
        data.is_what.push(student.value)
        counter++
        data.drawings[counter] = sketchPad.paths
        sketchPad.clear()
        console.log(data)
        student.value = ""
        saved++
        document.getElementById("counter").innerHTML = saved
        while(true){
            let place = document.getElementById("random_num").innerHTML
            randomNum()
            if(document.getElementById("random_num").innerHTML!=place){break}
        }
    }
}
