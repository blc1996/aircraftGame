function enemyAircraft(x, y){
        this.x = x;
        this.y = y;
        this.explosionX = x;
        this.explosionY = y;
        this.attackedX = x;
        this.attackedY = y;
        this.remainTime = 0;
        //this.speed = enemySpeed;
        this.attacked = false;
    }

    enemyAircraft.prototype.draw = function(){//Draw enemy
        const canvas = document.getElementById("myCanvas")
        const context = canvas.getContext("2d")
        if(!this.attacked){
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
            // quad(52+x, 25+y, 66+x, 30+y, 82+x, 25+y, 66+x, 41+y);
            // quad(56+x, 16+y, 77+x, 16+y, 74+x, 20+y, 59+x, 20+y);
        }else{//When an enemy is attacked, the enemy will still exist for a while to show the explosion.
            // if(this.remainTime<10){
            //     this.remainTime++;
            //     var x = this.attackedX;
            //     var y = this.attackedY;

            //     x = x - 44;
            //     y = y - 10;
            //     fill(192, 192, 192);
            //     rect(64+x, 16+y, 4, 18);
            //     //rect(52+x, 14+y, 28, 27);
            //     quad(52+x, 25+y, 66+x, 30+y, 82+x, 25+y, 66+x, 41+y);
            //     quad(56+x, 16+y, 77+x, 16+y, 74+x, 20+y, 59+x, 20+y);

            //     this.drawExplosion();
            // }
        }
    };
