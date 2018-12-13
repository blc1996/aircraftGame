function doKeyDown(event){
    if(event.key == "ArrowUp"){
        window.upFlag = true;
    }else if(event.key == "ArrowDown"){
        window.downFlag = true;
    }else if(event.key == "ArrowLeft"){
        window.leftFlag = true;
    }else if(event.key == "ArrowRight"){
        window.rightFlag = true;
    }else if(event.key == " "){
        window.bulletFlag = true;
    }
}

function doKeyUp(event){
    if(event.key == "ArrowUp"){
        window.upFlag = false;
    }else if(event.key == "ArrowDown"){
        window.downFlag = false;
    }else if(event.key == "ArrowLeft"){
        window.leftFlag = false;
    }else if(event.key == "ArrowRight"){
        window.rightFlag = false;
    }else if(event.key == " "){
        window.bulletFlag = false;
    }
}

function explosion(x, y){
    const canvas = document.getElementById("myCanvas")
    const context = canvas.getContext("2d")

    context.fillStyle = "#FF0000";
    const explode = new Path2D();
    explode.moveTo(x+24,y+13);
    explode.lineTo(x+39,y+14);
    explode.lineTo(x+40,y+6);
    explode.lineTo(x+24,y+13);
    explode.moveTo(x+51,y+24);
    explode.lineTo(x+39,y+14);
    explode.lineTo(x+40,y+6);
    explode.lineTo(x+51,y+24);
    explode.moveTo(x+58,y+6);
    explode.lineTo(x+39,y+14);
    explode.lineTo(x+40,y+6);
    explode.lineTo(x+58,y+6);
    explode.moveTo(x+26,y+2);
    explode.lineTo(x+39,y+14);
    explode.lineTo(x+40,y+6);
    explode.lineTo(x+26,y+2);
    explode.moveTo(x+33,y+10);
    explode.lineTo(x+44,y+-8);
    explode.lineTo(x+40,y+27);
    explode.lineTo(x+33,y+10);

    context.fill(explode);
}

function bulletCheck(){
    var bulletIter = Math.min(window.userAircraft_.bullets.length, window.userAircraft_.bullets._array.length);
    var enemyIter = Math.min(window.enemies.length, window.enemies._array.length);
    for(var i = 0; i < bulletIter; i++){
        var tempBullet = window.userAircraft_.bullets._array[i];
        if(!tempBullet.show)
            continue;
        for(var j = 0; j < enemyIter; j++){
            var tempEnemy = window.enemies._array[j];
            if(tempEnemy.attacked)
                continue;
            //set a area for collision
            if(tempBullet.x > tempEnemy.x && tempBullet.x < tempEnemy.x + 40 && tempBullet.y > tempEnemy.y - 10 && tempBullet.y < tempEnemy.y + 10){
                //an enemy is hit!
                window.userAircraft_.bullets._array[i].show = false;
                window.enemies._array[j].attacked = true;
                continue;
            }
        }
        if(!window.userAircraft_.bullets._array[i].show)
            continue;
    }
}

function collisionDetect(){
    var enemyIter = Math.min(window.enemies.length, window.enemies._array.length);
    var x = window.userAircraft_.x;
    var y = window.userAircraft_.y - 30;
    for(var i = 0; i < enemyIter; i++){
        var tempEnemy = window.enemies._array[i];
        if(x + 40 > tempEnemy.x && x - 10 < tempEnemy.x && y + 100 > tempEnemy.y && y + 10 < tempEnemy.y ){
            //an enemy is hit!
            window.userAircraft_.attacked = true;
            window.enemies._array[i].attacked = true;
            continue;
        }
    }
}
