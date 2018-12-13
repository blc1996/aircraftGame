function userAircraft(x, y){
        this.x = x;
        this.y = y;
        this.score = 0;
        this.speed = 2;//user motion speed.
        this.bullets = new ringBuffer(100);
        this.bulletSpeed = 5;
        this.attacked = false;//Status of user
        this.newBulletWait = 0;
        //this.score = 0;
        // this.bulletType =0 ;//Initial bullet type is TYPE 0
    }

userAircraft.prototype.draw = function(){//Draw player's aircraft
    const canvas = document.getElementById("myCanvas")
    const context = canvas.getContext("2d")
  //nee to modify the path
    var x = this.x - 127;
    var y = this.y - 228;
    context.strokeStyle = "#000000";
    context.fillStyle = "#9E9E9E";
    const aircraftPath = new Path2D();
    aircraftPath.arc(162+x, 251+y, 12, Math.PI, 2*Math.PI);
    aircraftPath.rect(150+x, 250+y, 24, 56);
    // aircraftPath.rect(140+x, 278+y, 4, 18);
    // aircraftPath.rect(181+x, 278+y, 4, 18);
    aircraftPath.moveTo(150+x, 278+y);
    aircraftPath.lineTo(135+x, 300+y);
    aircraftPath.lineTo(150+x, 300+y);
    aircraftPath.moveTo(174+x, 278+y);
    aircraftPath.lineTo(190+x, 300+y);
    aircraftPath.lineTo(174+x, 300+y);
    aircraftPath.moveTo(174+x, 306+y);
    aircraftPath.lineTo(182+x, 315+y);
    aircraftPath.lineTo(143+x, 315+y);
    aircraftPath.lineTo(150+x, 306+y);
    context.fill(aircraftPath);
    context.stroke(aircraftPath);
    if(this.attacked){
        // var x = this.x;
        // var y = this.y;
        // this.explosion(x,y);
        // this.explosion(x-10, y+30);
        // this.explosion(x+5, y+60);
        explosion(this.x, this.y);
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

    //see if a new bullet is launched, set a shortest interval of bullets
    if(window.userAircraft_.newBulletWait > 0)
        window.userAircraft_.newBulletWait--;
    if(window.bulletFlag && window.userAircraft_.newBulletWait == 0){
        window.userAircraft_.newBulletWait = 30;
        window.userAircraft_.bullets.set(window.userAircraft_.bullets.length, new bullet(window.userAircraft_.x + 33, window.userAircraft_.y));
    }

    //draw the user plane
    window.userAircraft_.draw();

    //draw the bullets
    var iter = Math.min(window.userAircraft_.bullets.length, window.userAircraft_.bullets._array.length);
    for(var i = 0; i < iter ; i++){
        var temp = window.userAircraft_.bullets._array[i];
            if(temp.show){
            temp.y -= 1;
            window.userAircraft_.bullets._array[i] = temp;
            temp.draw();
        }
    }
}

function bullet(x, y){
    this.x = x;
    this.y = y;
    this.show = true;
};

bullet.prototype.draw = function(){
    const canvas = document.getElementById("myCanvas")
    const context = canvas.getContext("2d")

    context.fillStyle = "#FF0000";
    context.fillRect(this.x, this.y, 3, 10);
}
