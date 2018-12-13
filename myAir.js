function welcomeScene(){

    //get canvas/context
    const canvas = document.getElementById("myCanvas")
    const context = canvas.getContext("2d")

    //create your shape data in a Path2D object
    const path = new Path2D()
    path.rect(200, 350, 100, 50)
    // path.rect(25,72,32,32)
    path.closePath()

    //draw your shape data to the context
    context.fillStyle = "#FF0000"
    context.fill(path)
    context.lineWidth = 1
    context.strokeStyle = "#FF0000"
    context.stroke(path)

    var aircraftShow = new userAircraft(150, 200);
    aircraftShow.draw();

    var enemyShow = new enemyAircraft(300, 230);
    enemyShow.draw();

    //text
    context.fillStyle = "#000000";
    context.font="20px Georgia";
    context.fillText("葛男也太强了吧",190,200);
    context.fillText("player",160,320);
    context.fillText("enemy",310,320);
    context.fillStyle = "#FFFFFF";
    context.fillText("start!",230,380);



    function getXY(canvas, event){ //adjust mouse click to canvas coordinates
        const rect = canvas.getBoundingClientRect()
        const y = event.clientY - rect.top
        const x = event.clientX - rect.left
        return {x:x, y:y}
    }

    document.addEventListener("click",  function (e) {
        const XY = getXY(canvas, e)
        //use the shape data to determine if there is a collision
        if(context.isPointInPath(path, XY.x, XY.y)) {
            // Do Something with the click
            gameStart();
        }
    }, false)

}

function doKeyDown(event){
    if(event.key == "ArrowUp"){
        window.upFlag = true;
    }else if(event.key == "ArrowDown"){
        window.downFlag = true;
    }else if(event.key == "ArrowLeft"){
        window.leftFlag = true;
    }else if(event.key == "ArrowRight"){
        window.rightFlag = true;
    }
}

function doKeyUp(event){
    console.log(window.userAircraft_.x);
    console.log(window.userAircraft_.y);
    if(event.key == "ArrowUp"){
        window.upFlag = false;
    }else if(event.key == "ArrowDown"){
        window.downFlag = false;
    }else if(event.key == "ArrowLeft"){
        window.leftFlag = false;
    }else if(event.key == "ArrowRight"){
        window.rightFlag = false;
    }
}


function flushUserAircraft(){
    if(window.upFlag){
        if(window.userAircraft_.y - window.userAircraft_.speed > 0)
            window.userAircraft_.y -= window.userAircraft_.speed;
    }
    if(window.downFlag){
        if(window.userAircraft_.y + window.userAircraft_.speed < 410)
            window.userAircraft_.y += window.userAircraft_.speed;
    }
    if(window.leftFlag){
        if(window.userAircraft_.x - window.userAircraft_.speed > 0)
            window.userAircraft_.x -= window.userAircraft_.speed;
    }
    if(window.rightFlag){
        if(window.userAircraft_.x + window.userAircraft_.speed < 430)
            window.userAircraft_.x += window.userAircraft_.speed;
    }
    window.userAircraft_.draw();
}

function flushEnermy(){
    if(window.enemyTimer == 15){
        window.enemyTimer = 0;
        window.enemies[window.numOfEnemies++] = new enemyAircraft(Math.ceil(Math.random()*430), 0);
    }else{
      window.enemyTimer++;
    }

    for(var i = 0; i < window.numOfEnemies; i++){
        window.enemies[i].y += 2;
        window.enemies[i].draw();
    }
}

function gameStart(){
    const canvas = document.getElementById("myCanvas")
    const context = canvas.getContext("2d")
    canvas.height=canvas.height;

    window.addEventListener('keydown', doKeyDown, true);
    window.addEventListener('keyup', doKeyUp, true);

    window.terminate = false;

    window.userAircraft_ = new userAircraft(200,200);
    window.numOfEnemies = 0;
    window.enemies = [];

    //motion flags
    window.upFlag = false;
    window.downFlag = false;
    window.leftFlag = false;
    window.rightFlag = false;

    window.enemyTimer = 0;

    timer = function(){
        console.log("timeout");
        canvas.height=canvas.height;
        flushUserAircraft();
        flushEnermy();
        if(!window.terminate){
            setTimeout(timer, 1);
        }
    }
    setTimeout(timer , 1);
}
