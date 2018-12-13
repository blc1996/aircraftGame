function enemyAircraft(x, y){
        this.x = x;
        this.y = y;
        this.remainCnt = 30;
        //this.speed = enemySpeed;
        this.attacked = false;
    }

    enemyAircraft.prototype.draw = function(){//Draw enemy
        if(this.remainCnt > 0){
            const canvas = document.getElementById("myCanvas")
            const context = canvas.getContext("2d")
            var x = this.x - 44;
            var y = this.y - 10;

            context.strokeStyle = "#000000";
            context.fillStyle = "#9E9E9E";
            const enemyPath = new Path2D();
            enemyPath.rect(64+x, 20+y, 4, 18);
            enemyPath.moveTo(66+x, 30+y);
            enemyPath.lineTo(82+x, 25+y);
            enemyPath.lineTo(66+x, 41+y);
            enemyPath.lineTo(52+x, 25+y);
            enemyPath.lineTo(66+x, 30+y);
            enemyPath.moveTo(77+x, 16+y);
            enemyPath.lineTo(74+x, 20+y);
            enemyPath.lineTo(59+x, 20+y);
            enemyPath.lineTo(56+x, 16+y);
            enemyPath.lineTo(77+x, 16+y);
            context.fill(enemyPath);
            context.stroke(enemyPath);

            if(this.attacked){
                this.remainCnt--;
                explosion(this.x - 15, this.y);
            }
        }
    };

function flushEnermy(){
    if(window.enemyTimer == 30){
        window.enemyTimer = 0;
        window.enemies.set(window.numOfEnemies++, new enemyAircraft(Math.ceil(Math.random()*430), 0));
    }else{
      window.enemyTimer++;
    }

    //draw enermies one by one
    var iter = Math.min(window.enemies.length, window.enemies._array.length);
    for(var i = 0; i < iter ; i++){
        var temp = window.enemies._array[i];
        if(!temp.attacked){
            temp.y += 1;
            window.enemies._array[i] = temp;
        }
        temp.draw();
    }
}
