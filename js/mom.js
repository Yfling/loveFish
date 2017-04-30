var momObj = function() {
    this.x;  // 大鱼的x坐标
    this.y;  // 大鱼的y坐标
    this.angle;  // 大鱼的角度

    this.momTailTimer = 0;
    this.momTailCount = 0;

    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;

    this.momBodyCount = 0;
}
momObj.prototype.init = function() {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
}
momObj.prototype.draw = function() {
    // 鱼跟随鼠标
    // lerpDistance封装在库文件中
    this.x = lerpDistance(mx, this.x, 0.98);
    this.y = lerpDistance(my, this.y, 0.98);

    // 大鱼应该偏移的角度
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;

    // 大鱼跟随鼠标旋转
    this.angle = lerpAngle(beta, this.angle, 0.6);

    // tail
    this.momTailTimer += deltaTime;
    if (this.momTailTimer > 50) {
        this.momTailCount = (this.momTailCount + 1) % 8;
        this.momTailTimer %= 50;
    }

    // eye
    this.momEyeTimer += deltaTime;
    if (this.momEyeTimer > this.momEyeInterval) {
        this.momEyeCount = (this.momEyeCount + 1) % 2;
        this.momEyeTimer %= this.momEyeInterval;
        if (this.momEyeCount == 0) {
            this.momEyeInterval = Math.random() * 1500 + 2000;
        }
        else {
            this.momEyeInterval = 200;
        }
    }


    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    var momTailCount = this.momTailCount;
    ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);

    var momBodyCount = this.momBodyCount;
    // 如果double为1，绘制橙色的身体
    if (data.double == 1) {
        ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
    }
    else {
        ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
    }

    var momEyeCount = this.momEyeCount;
    ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);

    ctx1.restore();
}
