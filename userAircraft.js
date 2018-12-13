function userAircraft(x, y){
        this.x = x;
        this.y = y;
        this.score = 0;
        this.speed = 2;//user motion speed.
        this.bulletX = [];//store x of each bullet
        this.bulletY = [];//store y of each bullet
        this.bulletAttacked = [];//store status of each bullet
        this.bulletMove = [];//store trajectory function of each bullet
        this.bulletSpeed = 5;
        this.attacked = false;//Status of user
        //this.score = 0;
        this.bulletType =0 ;//Initial bullet type is TYPE 0
        this.newBulletTime = 0;//Each bullet type(except TYPE 0) has a usage
    }

    userAircraft.prototype.draw = function(){//Draw player's aircraft
        const canvas = document.getElementById("myCanvas")
        const context = canvas.getContext("2d")
        if(!this.attacked){
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
        }else{//If the player is attacked, this will draw some explosion effect.
            // var x = this.x;
            // var y = this.y;
            // this.explosion(x,y);
            // this.explosion(x-10, y+30);
            // this.explosion(x+5, y+60);
        }
    }
