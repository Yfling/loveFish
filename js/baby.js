var babyObj = function() {
    this.x;  // 小鱼的x坐标
    this.y;  // 小鱼的Y坐标
    this.angle  // 小鱼的移动角度
    this.babyBody = new Image();

    // 小鱼尾巴定时器相关
    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    // 小鱼眼睛相关定时器
    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;

    // 小鱼身体颜色相关定时器
    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
}
babyObj.prototype.init = function() {

    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;
    this.babyBody.src = "./src/babyFade0.png";
}
babyObj.prototype.draw = function() {
    //lerp x, y
    this.x = lerpDistance(mom.x, this.x, 0.98);
    this.y = lerpDistance(mom.y, this.y, 0.98);

    // lerp angle
    // Math.atan2(y,x)
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;

    //lerp angle
    this.angle = lerpAngle(beta, this.angle, 0.6);

    // baby tail count
    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        // 定时器复原
        this.babyTailTimer %= 50;
    }

    // baby eye
    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval) {
        // 总共两张图片，所以 mod 2
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;

        // 当为1.png第一张图的时候（即睁眼睛）
        if (this.babyEyeCount == 0) {
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        }
        else {
            this.babyEyeInterval = 200;
        }
    }


    // baby body
    this.babyBodyTimer += deltaTime;
    if (this.babyBodyTimer > 300) {
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 300;
        if (this.babyBodyCount > 19) {
            this.babyBodyCount = 19;
            //game over
            data.gameOver = true;
        }
    }

    //cxt1
    ctx1.save();
    //translate()
    ctx1.translate(this.x, this.y)
    ctx1.rotate(this.angle);

    var babyTailCount = this.babyTailCount;
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);
    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
    var babyEyeCount = this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);

    ctx1.restore();
}
