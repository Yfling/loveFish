var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;

var mom;
var baby;

var mx;  // 鼠标的x坐标
var my;  // 鼠标的y坐标

// 用来存放小鱼尾巴摆动的图片
var babyTail = [];
// 用来存放小鱼眨眼睛的图片的数组
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

var data;

var wave;


document.body.onload = game;

function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

// 游戏画布的初始化
function init() {
    // 获得canvas context
    //  can1用来放背景图片 can2用来绘制其除背景图片以外的其他元素
    can1 = document.getElementById('canvas1');  // fishes, dust, UI, circle
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById('canvas2');  // fishes, dust, UI, circle
    ctx2 = can2.getContext("2d");

    // 获得鼠标的位置
    can1.addEventListener('mousemove', onMouseMove, false);

    bgPic.src = "./src/background.jpg";

    canWidth = can1.width;
    canHeight = can1.height;

    // new一个海葵对象并初始化
    ane = new aneObj();
    ane.init();

    // new一个果实对象并初始化
    fruit = new fruitObj();
    fruit.init();

    // new一个鱼妈妈对象并初始化
    mom = new momObj();
    mom.init();

    // new一个鱼宝宝对象、并初始化
    baby = new babyObj();
    baby.init();

    // 鼠标的位置初始化子在canvas的中心
    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    // 将小鱼尾巴摆动的八张图片放入数组中
    for (var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "./src/babyTail" + i + ".png";
    }

    // 将小鱼眨眼睛的图片放入数组中
    for (var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }

    for (var i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade" + i + ".png";
    }

    for (var i = 0; i < 8; i++) {
        momTail[i] = new Image();
        momTail[i].src = "./src/bigTail" + i + ".png";
    }
    for (var i = 0; i < 2; i++) {
        momEye[i] = new Image();
        momEye[i].src = "./src/bigEye" + i + ".png";
    }
    data = new dataObj();

    for (var i = 0; i < 8; i++) {
        momBodyOra[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOra[i].src = "./src/bigSwim" + i + ".png";
        momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
    }

    ctx1.font = "30px Verdana";
    ctx1.textAlign = "center";

    wave = new waveObj();
    wave.init();
}

// 游戏循环函数
function gameloop() {
    window.requestAnimFrame(gameloop);  // setInterval, setTimeout, fps
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if (deltaTime > 40) {
        deltaTime = 40;
    }

    drawBackground();
    ane.draw();
    fruitMointor();
    fruit.draw();

    // 绘制大鱼之前先清除画布
    ctx1.clearRect(0, 0, canWidth, canHeight);
    mom.draw();
    baby.draw();
    momFruitsCollision();
    momBabyCollision();

    data.draw();
    wave.draw();
}

function onMouseMove(e) {
    // 获取鼠标的xy坐标
    // 只有当游戏没有结束的时候才能控制鼠标
    if (!data.gameOver) {
        if (e.offSetX || e.layerX) {
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
    }
}
