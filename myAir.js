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

function gameStart(){
    document.removeEventListener("click",  function (e) {
        const XY = getXY(canvas, e)
        //use the shape data to determine if there is a collision
        if(context.isPointInPath(path, XY.x, XY.y)) {
            // Do Something with the click
            gameStart();
        }
    }, false)

    const canvas = document.getElementById("myCanvas")
    const context = canvas.getContext("2d")
    canvas.height=canvas.height;

    window.addEventListener('keydown', doKeyDown, true);
    window.addEventListener('keyup', doKeyUp, true);

    window.userAircraft_ = new userAircraft(200,200);
    window.numOfEnemies = 0;
    window.enemies = new ringBuffer(30);

    //motion flags
    window.upFlag = false;
    window.downFlag = false;
    window.leftFlag = false;
    window.rightFlag = false;
    window.bulletFlag = false;

    window.enemyTimer = 0;

    timer = function(){
        canvas.height=canvas.height;
        bulletCheck();
        collisionDetect();
        flushUserAircraft();
        flushEnermy();
        if(!window.userAircraft_.attacked){
            setTimeout(timer, 1);
        }else{
            endOfGame();
        }
    }

    //set a timer to flush the canvas
    setTimeout(timer , 1);
}

function endOfGame(){

    window.removeEventListener('keydown', doKeyDown, true);
    window.removeEventListener('keyup', doKeyUp, true);
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

    context.fillStyle = "#000000";
    context.font="20px Georgia";
    context.fillText("Game over!!!",190,200);
    context.fillStyle = "#FFFFFF";
    context.fillText("again!",230,380);

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
            location.reload();
        }
    }, false)
}
