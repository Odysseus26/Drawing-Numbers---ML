function analyze(draws){
    let mouse_clicks = draws.length,merger = []
    for(let i=0;i<draws.length;i++){
        for(let a=0;a<draws[i].length;a++) merger.push(draws[i][a])
    }
    let length = merger.length;
    merger = [merger[0],merger[merger.length-1]]
    let x_change = merger[1][0] - merger[0][0],y_change = merger[1][1] - merger[0][1]
    return {
        "mouse-clicks":mouse_clicks,
        "data-length":length,
        "x-change":x_change,
        "y-change":y_change
    }
}

module.exports = {
    "analyze":analyze
}