//  封装一个果实类


var fruitObj = function() {
    this.alive = [];  // bool
    this.x = [];  // x坐标
    this.y = [];  // y坐标
    this.l = [];  // 果实的大小
    this.spd = [];  // 果实上浮的速度
    this.fruitType = [];  // 果实的类型
    //果实图片
    this.orange = new Image();
    this.blue = new Image();
}
// 定义果实的数量
fruitObj.prototype.num = 30;
// 初始化果实
fruitObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        //果实的初始大小
        this.spd[i] = Math.random() * 0.017 + 0.003;
        this.fruitType[i] = "";
    }
    this.orange.src = "./src/fruit.png";
    this.blue.src = "./src/blue.png";
}
// 画果实
fruitObj.prototype.draw = function() {
    for (var i = 0; i < this.num; i++) {
        // draw
        // find on one, grou, fly up
        if (this.alive[i]) {
            if (this.fruitType[i] == "blue") {
                var pic = this.blue;
            }
            else {
                var pic = this.orange;
            }
            // 当果实的大小小于14的时候，大小不断增加
            if (this.l[i] <= 14) {
                this.l[i] += this.spd[i] * deltaTime;
            }
            // 否则，果实的y坐标不断减小
            else {
                this.y[i] -= this.spd[i] * 7 * deltaTime;
            }
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            if (this.y[i] < 10) {
                this.alive[i] = false;
            }
        }
    }
}
// 给即将出生的果实找到一个随机位置出生
fruitObj.prototype.born = function(i) {
    var aneID = Math.floor(Math.random() * ane.num);
    this.x[i] = ane.x[aneID];
    this.y[i] = canHeight - ane.len[aneID];
    this.l[i] = 0;
    this.alive[i] = true;
    // 引入一个随机数ran来控制蓝色果实和橘色果实出生的概率
    var ran = Math.random();
    if (ran < 0.2) {
        this.fruitType[i] = "blue";
    }
    else {
        this.fruitType[i] = "orange";
    }
}
fruitObj.prototype.dead = function(i) {
    this.alive[i] = false;
}
// 监视果实的实时数量
function fruitMointor() {
    var num = 0;
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) {
            num++;
        }
    }
    if (num < 15) {
        sendFruit();
        return;
    }
}
// 把果实的数量监视在一定数量内
function sendFruit() {
    // 当果实的数目小于规定的数目，则一个一个的增加
    for (var i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {
            // 传入i对应的果实
            fruit.born(i);
            return;
        }
    }
}
