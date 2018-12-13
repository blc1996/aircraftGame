var bullet = function(x, y, type, leftRight){//create a new type called bullet
    this.x = x;
    this.y = y;
    this.type = type || 0;//I have three type of bullet. They are 0(original type), 1(A) and 2(B).
    this.leftRight = leftRight || 0;//leftRight is only used for TYPE 2(B).
};
bullet.prototype.move = function(tempY){//This method is used to store different trajectories of each bullet
    if(this.type!==2){
        return this.x;//Used for TYPE 0 and TYPE 1(A). Because x doesn't change.
    }
    else{//if bullet type is TYPE 2(B), x will change with y. Here are their trajectory functions.
        if(this.leftRight === -1){
            return this.x - (this.y-tempY)*tan(10);
        }
        else if(this.leftRight === -2){
            return this.x - (this.y-tempY)*tan(20);
        }
        else if(this.leftRight === 1){
            return this.x + (this.y-tempY)*tan(10);
        }
        else if(this.leftRight === 2){
            return this.x + (this.y-tempY)*tan(20);
        }
        else if(this.leftRight ===0){
            return this.x;
        }
    }
};

var aircraftUser = function(x, y){//Create a new type called aircraftUser representing user.
    this.x = x;
    this.y = y;
    this.score = 0;
    this.speed = 3;//user motion speed.
    this.bulletX = [];//store x of each bullet
    this.bulletY = [];//store y of each bullet
    this.bulletAttacked = [];//store status of each bullet
    this.bulletMove = [];//store trajectory function of each bullet
    this.bulletSpeed = 5;
    this.attacked = false;//Status of user
    //this.score = 0;
    this.bulletType =0 ;//Initial bullet type is TYPE 0
    this.newBulletTime = 0;//Each bullet type(except TYPE 0) has a usage time
};

aircraftUser.prototype.draw = function(){//Draw player's aircraft
    if(!this.attacked){
        var x = this.x;
        var y = this.y;
        fill(192, 192, 192);
        x = x - 127;
        y = y - 228;
        rect(140+x, 278+y, 4, 18);
        rect(181+x, 278+y, 4, 18);
        triangle(150+x, 278+y, 135+x, 300+y, 150+x, 300+y);
        triangle(176+x, 278+y, 192+x, 300+y, 176+x, 300+y);
        quad(155+x, 304+y, 169+x, 304+y, 182+x, 315+y, 143+x, 315+y);
        rect(150+x, 250+y, 25, 56);
        arc(163+x, 251+y, 25, 25, 180, 360);
    }
    else{//If the player is attacked, this will draw some explosion effect.
        var x = this.x;
        var y = this.y;
        this.explosion(x,y);
        this.explosion(x-10, y+30);
        this.explosion(x+5, y+60);
    }

};

aircraftUser.prototype.explosion = function(x, y){//Draw explosion effect.
    fill(255, 0, 0);
    noStroke();
    triangle(x+24,y+13,x+39,y+14,x+40,y+6);
    triangle(x+51,y+24,x+39,y+14,x+40,y+6);
    triangle(x+58,y+6,x+39,y+14,x+40,y+6);
    triangle(x+26,y+2,x+39,y+14,x+40,y+6);
    triangle(x+33,y+10,x+44,y+-8,x+40,y+27);
    stroke(0, 0, 0);
};

aircraftUser.prototype.move = function(up_down, left_right){//This method is used to move the body of player's aircraft
    if(up_down === -1){
        this.y -= this.speed;
    }
    else if(up_down === 1){
        this.y += this.speed;
    }

    if(left_right === -1){
        this.x -= this.speed;
    }
    else if(left_right === 1){
        this.x += this.speed;
    }

    if(this.x < 0){//Don't make the user's aircraft go out of screen.
        this.x = 0;
    }
    else if(this.x > 330){
        this.x = 330;
    }

    if(this.y < 40){
        this.y = 40;
    }
    else if(this.y >310){
        this.y = 310;
    }
};

aircraftUser.prototype.drawBullet = function(){//Draw each bullet.
    fill(255, 0, 0);
    for(var i=0; i<this.bulletY.length; i++){
        if(!this.bulletAttacked[i]){//If this bullet attacks enemy, the bullet will disappear.
            //rect(this.bulletX[i]+33, this.bulletY[i], 5, 12);
            ellipse(this.bulletX[i]+36, this.bulletY[i]+6, 5, 12);
        }
    }
    //rect(this.x+33, this.y, 5, 12);
};



aircraftUser.prototype.moveBullet = function(){
    if(this.bulletX.length===0){//If these arries don't have any bullet, this will add a new bullet in it.
        //Attention! No matter what I have do with bullet, I should change bulletX, bulletY, bulletAttacked, and bulletMove together.
        this.bulletX.push(this.x);
        this.bulletY.push(this.y);
        this.bulletAttacked.push(false);
        this.bulletMove.push(new bullet(this.x, this.y, 0));

        /*this.bulletX.push(this.x+10);
        this.bulletY.push(this.y);
        this.bulletAttacked.push(false);

        this.bulletX.push(this.x-10);
        this.bulletY.push(this.y);
        this.bulletAttacked.push(false);*/
        //this.bulletY.shift();
    }
    else{
        for(var i=0; i<this.bulletY.length; i++){//Move all the bullets
            this.bulletY[i] -= this.bulletSpeed;//Bullets move up
            this.bulletX[i] = this.bulletMove[i].move(this.bulletY[i]);//x of each bullet will change differently because of its bullet type.
        }

        if(this.y-this.bulletY[this.bulletY.length-1] > 35){//When the latest bullet move up for a small distance, this will add a new bullet into arrays. This is why you can see player can shoot continuously.
            //println(this.bulletY.length);
            this.bulletX.push(this.x);
            this.bulletY.push(this.y);
            this.bulletAttacked.push(false);
            this.bulletMove.push(new bullet(this.x, this.y, this.bulletType));

            //If the bullet type is TYPE 1(A) or TYPE 2(B), this will add more bullets into arrays. And the newBulletTime is used to record the usage of bullet. If the time is over, you just can't use TYPE 1(A) or TYPE 2(B) until the player gets A or B again.
            if(this.bulletType === 1 && this.newBulletTime<50){
                this.newBulletTime++;

                this.bulletX.push(this.x+10);
                this.bulletY.push(this.y);
                this.bulletAttacked.push(false);
                this.bulletMove.push(new bullet(this.x+10, this.y, this.bulletType));

                this.bulletX.push(this.x-10);
                this.bulletY.push(this.y);
                this.bulletAttacked.push(false);
                this.bulletMove.push(new bullet(this.x-10, this.y, this.bulletType));
            }
            if(this.bulletType === 2 && this.newBulletTime<50){
                this.newBulletTime++;

                this.bulletX.push(this.x);
                this.bulletY.push(this.y);
                this.bulletAttacked.push(false);
                this.bulletMove.push(new bullet(this.x, this.y, this.bulletType, -1));

                this.bulletX.push(this.x);
                this.bulletY.push(this.y);
                this.bulletAttacked.push(false);
                this.bulletMove.push(new bullet(this.x, this.y, this.bulletType, 1));

                this.bulletX.push(this.x);
                this.bulletY.push(this.y);
                this.bulletAttacked.push(false);
                this.bulletMove.push(new bullet(this.x, this.y, this.bulletType, -2));

                this.bulletX.push(this.x);
                this.bulletY.push(this.y);
                this.bulletAttacked.push(false);
                this.bulletMove.push(new bullet(this.x, this.y, this.bulletType, 2));
            }
        }
        while(this.bulletY[0]<0){//Check if the oldest bullet is out of the screen. If true, this will shift it (get rid of it). I don't use "pop", because pop is used to clean the last one of an array.
            this.bulletX.shift();
            this.bulletY.shift();
            this.bulletAttacked.shift();
            this.bulletMove.shift();
        }
    }
};

aircraftUser.prototype.checkBullet = function(enemy){//Check if the bullet attacks enemy.
    for(var i=0; i<this.bulletX.length; i++){
        if(!this.bulletAttacked[i]){
            for(var j=0; j<enemy.length; j++){
                if(!enemy[j].attacked && enemy[j].y>30){
                    if(this.bulletX[i]-enemy[j].x<2 && this.bulletX[i]-enemy[j].x>-28 && this.bulletY[i]-enemy[j].y<27 && this.bulletY[i]-enemy[j].y>-2){
                        enemy[j].attacked = true;
                        enemy[j].explosionX = this.bulletX[i];//Record the postion of explosion
                        enemy[j].explosionY = this.bulletY[i];
                        enemy[j].attackedX = enemy[j].x;
                        enemy[j].attackedY = enemy[j].y;
                        this.bulletAttacked[i] = true;//Set the flag TRUE
                        this.score++;//An enemy is attacked and the player will get one point.
                    }
                }
            }
        }
    }
};

aircraftUser.prototype.checkAttacked = function(enemy){//Check if the player is attacked
    for(var j=0; j<enemy.length; j++){
        if(!enemy[j].attacked){
            if(this.x-enemy[j].x<13 && this.x-enemy[j].x>-38 && this.y-enemy[j].y<7 && this.y-enemy[j].y>-80){
                this.attacked = true;
            }
        }
    }
};

aircraftUser.prototype.checkBonus = function(bonuses){//Check if the player gets the bonus
    if(bonuses.length>0){
        if(this.x-bonuses[0].x<13 && this.x-bonuses[0].x>-38 && this.y-bonuses[0].y<7 && this.y-bonuses[0].y>-80){//If the player gets the bonus, the bonus will disappear and user's aircraft will change the bullet type.
            bonuses[0].show = false;
            this.bulletType = bonuses[0].bulletType;
            this.newBulletTime = 0;//Reset the usage time of bullet.
        }
    }
};

var bonus = function(x, y, label, type){//Create a new type called bonus
    this.x = x;//The position of the bonus
    this.y = y;
    this.label = label || "A";//Label sticked on the bonus
    this.show = true;//Status
    this.bulletType = type || 1;//TYPE 1(A) or TYPE 2(B)
};
bonus.prototype.draw = function(){//Draw bonus
    if(this.show){
        stroke(255, 0, 0);
        fill(255, 255, 255);
        ellipse(this.x+18, this.y+14, 30, 20);
        fill(0, 0, 0);
        textSize(15);
        text(this.label, this.x+13, this.y+23);
        stroke(0, 0, 0);
    }
};
bonus.prototype.move = function(){
    this.y += 2;
};

var bonuses = [];//Create an array to store bonus. But, actually, there will be always one or zero bonus in it. I use an array because it's convenient to add or delete bonus.

var giveBonus = function(bonuses){//A global function to manage the bonuses
    if(bonuses.length===0){//Only if the bonuses is empty, I would add a new bonus in it.
        var temp = random(0,1000);
        if(temp<1){//The probability of dropping a "A" will be 1/1000
            bonuses.push(new bonus(random(20,300),0,"A",1));
        }
        else if(temp>999){//The probability of dropping a "B" will be 1/1000
            bonuses.push(new bonus(random(20,300),0,"B",2));
        }
    }
    else{
        if(bonuses[0].y>400){//If the bonus is out of the screen, delete the bonus.
            bonuses.pop();
        }
        else{
            bonuses[0].move();
            bonuses[0].draw();
        }
    }
};

var enemySpeed = 1;//The speed of enemies. A global variable can make changing the speed of all the enemies more eaiser.

var aircraftEnemy = function(x, y){//Create a new type representing enemy.
    this.x = x;
    this.y = y;
    this.explosionX = x;
    this.explosionY = y;
    this.attackedX = x;
    this.attackedY = y;
    this.remainTime = 0;
    //this.speed = enemySpeed;
    this.attacked = false;
};

aircraftEnemy.prototype.draw = function(){//Draw enemy
    if(!this.attacked){
        var x = this.x;
        var y = this.y;

        x = x - 44;
        y = y - 10;
        fill(192, 192, 192);
        rect(64+x, 16+y, 4, 18);
        //rect(52+x, 14+y, 28, 27);
        quad(52+x, 25+y, 66+x, 30+y, 82+x, 25+y, 66+x, 41+y);
        quad(56+x, 16+y, 77+x, 16+y, 74+x, 20+y, 59+x, 20+y);
    }
    else{//When an enemy is attacked, the enemy will still exist for a while to show the explosion.
        if(this.remainTime<10){
            this.remainTime++;
            var x = this.attackedX;
            var y = this.attackedY;

            x = x - 44;
            y = y - 10;
            fill(192, 192, 192);
            rect(64+x, 16+y, 4, 18);
            //rect(52+x, 14+y, 28, 27);
            quad(52+x, 25+y, 66+x, 30+y, 82+x, 25+y, 66+x, 41+y);
            quad(56+x, 16+y, 77+x, 16+y, 74+x, 20+y, 59+x, 20+y);

            this.drawExplosion();
        }
    }
};

aircraftEnemy.prototype.move = function(){//The enemy move down.
    this.y += enemySpeed;
    //this.x = random(this.x-2, this.x+2);
};

aircraftEnemy.prototype.drawExplosion = function(){//Draw explosion effect at the place of bullet.
    fill(255, 0, 0);
    noStroke();
    var x = this.explosionX-4;
    var y = this.explosionY-10;
    triangle(x+24,y+13,x+39,y+14,x+40,y+6);
    triangle(x+51,y+24,x+39,y+14,x+40,y+6);
    triangle(x+58,y+6,x+39,y+14,x+40,y+6);
    triangle(x+26,y+2,x+39,y+14,x+40,y+6);
    triangle(x+33,y+10,x+44,y+-8,x+40,y+27);
    stroke(0, 0, 0);
};

//Button type from Khan
var Button = function(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 150;
    this.height = config.height || 50;
    this.label = config.label || "Click";
    this.onClick = config.onClick || function() {};
};

Button.prototype.draw = function() {
    stroke(0, 0, 0);
    strokeWeight(1);
    fill(255, 255, 255);
    rect(this.x, this.y, this.width, this.height, 5);
    fill(0, 0, 0);
    textSize(19);
    textAlign(CENTER, TOP);
    text(this.label, this.x+this.width/2, this.y+this.height/4.5);
    textAlign(LEFT, BOTTOM);
};

Button.prototype.isMouseInside = function() {
    return mouseX > this.x &&
           mouseX < (this.x + this.width) &&
           mouseY > this.y &&
           mouseY < (this.y + this.height);
};

Button.prototype.handleMouseClick = function() {
    if (this.isMouseInside()) {
        this.onClick();
    }
};


var user = new aircraftUser(196, 300);//This aircraft is shown on the playing scene.
var enemy = [];
for(var i=0; i<10; i++){
    enemy.push(new aircraftEnemy(random(0,350), -i*40));//Initially, I will store 10 enemies into the array.
}
var enemyNum = 0;

//DrawaircraftUser(198, 300);
//user.draw();
//aircraftEnemy(0, 0);

//var userSpeed = 3;
var up_down = 0;//Record the next motion.
var left_right = 0;

//var num = 0;
keyPressed = function() {//Everytime one key is pressed, this function will be called
  //println("pressed " + (key) + " " + keyCode);
  if(keyCode === LEFT){
        left_right = -1;
        //println("pressed Left " + num++ + " " + keyCode);
    }
    else if(keyCode === RIGHT){
        left_right = 1;
        //println("pressed Right " + num++ + " " + keyCode);
    }
    else if(keyCode === UP){
        up_down = -1;
    }
    else if(keyCode === DOWN){
        up_down = 1;
    }
};


keyReleased = function() {//Everytime one key is released, this function will be called
    if(keyCode === LEFT){
        left_right = 0;
    }
    else if(keyCode === RIGHT){
        left_right = 0;
    }
    else if(keyCode === UP){
        up_down = 0;
    }
    else if(keyCode === DOWN){
        up_down = 0;
    }
};
var enemy1 =[];//This enemy will show on the scene 1.
enemy1.push(new aircraftEnemy(324,185));
var userShow = new aircraftUser(174, 135);//This user aircraft will show on the scene 1.
var currentScene = 1;//Record the current scene.
var btn1 = new Button({//Start button on the scene 1.
    x: 136,
    y: 298,
    label: "Start",
    onClick: function() {
        //drawScene2();
        currentScene = 2;
        //drawScene2();
    }
});
var pauseFlag = 0;
var btnPause = new Button({//"Pause" "Return" button
    x: 320,
    y: 5,
    width: 70,
    height: 30,
    label: "Pause",
    onClick: function(){//Everytime the button is pressed, the game will pause and the button will change into "Return" button. And then player can press "Return" to return to the game.
        if(pauseFlag === 0){
            pauseFlag = 1;
            this.label = "Return";
            this.x = 162;
            this.y = 200;
        }
        else{
            pauseFlag = 0;
            this.label = "Pause";
            this.x = 320;
            this.y = 5;
        }
    }
});
var drawScene1 = function(){//Scene 1. Describe how to play the game and show some figures.
    currentScene = 1;
    background(255, 255, 255);

    var b = new bonus(51,172, "A",1);
    b.draw();//Show bonus

    fill(0, 0, 0);
    textSize(30);
    text("Aircraft War", 123, 60);
    textSize(20);
    text("Author: Ziyun Ge", 127, 100);
    enemy1[0].draw();
    userShow.draw();
    fill(255, 0, 0);
    text("Your Aircraft", 146, 254);
    text("The Enemy", 290, 255);
    text("Bonus", 39, 255);
    btn1.draw();
};



drawScene1();

mouseClicked = function(){//Everytime the screen is clicked, this function will be called.
    if(currentScene === 1){//If you are in the scene 1, the start button will work
        btn1.handleMouseClick();
    }
    else if(currentScene === 2){//If you are in the scene 2, the pause button will work.
        btnPause.handleMouseClick();
    }
};

draw = function() {
    if(currentScene === 1){
        drawScene1();
    }
    else{//If you are in Scene 2.
        currentScene = 2;
        if(!user.attacked && pauseFlag!==1){
            background(255, 255, 255);
            if(keyIsPressed){//Check if any key is pressed
                user.move(up_down, left_right);
            }
            user.moveBullet();
            for(var i=0; i<enemy.length ;i++){
                enemy[i].move();
                enemy[i].draw();
            }
            user.checkBullet(enemy);
            if(enemy[0].y>400){//If the oldest enemy is out of the screen, this will delete that one and count the number of enemies.
                enemyNum++;
                enemy.shift();
                enemy.push(new aircraftEnemy(random(0,350), -30));
                if(enemyNum > 50){//Everytime the number of enemies is more than 50, the speed of enemies will increase and eneyNum will be cleaned.
                    enemyNum = 0;
                    enemySpeed++;
                    //for
                }
            }
            giveBonus(bonuses);//Call bonus
            user.checkBonus(bonuses);//Check if the user's aircraft gets the bonus.




            user.drawBullet();//Draw bullets
            user.draw();

            //score board
            fill(0, 255, 119);
            noStroke();
            rect(0, 0, width+10, 40);
            fill(0, 0, 0);
            textSize(24);
            text("Score: "+user.score, 14, 33);
            text("Speed: "+enemySpeed, 167, 33);
            stroke(0, 0, 0);

            btnPause.draw();

            /*user.checkBullet(enemy1);
            //if(!enemy1[0].attacked){
                enemy1[0].draw();
            //}
            enemy1[0].drawExplosion();



            user.checkAttacked(enemy);
            user.checkAttacked(enemy1);*/
            user.checkAttacked(enemy);
        }
        else if(user.attacked===true){//If the user is attacked, the game will be over.
            user.draw();
            fill(0, 255, 119);
            rect(width/4, height/3, width/4*2, height/3);
            fill(0, 0, 0);
            textSize(30);
            text("Game Over!", width/2-85, height/2+10);
        }
        else if(pauseFlag === 1){//If the pause button is clicked, the game will be paused and there will be a message shown on the screen.
            fill(0, 255, 119);
            rect(width/4, height/3, width/4*2, height/3);
            fill(0, 0, 0);
            textSize(20);
            text("Game Paused", width/2-72, height/2+-25);
            /*textSize(15);
            text("Press Start to Start Again",width/2-87, height/2+6);*/
            btnPause.draw();
        }
    }
};
