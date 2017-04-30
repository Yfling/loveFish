//  封装一个海葵类
var aneObj = function() {
    //  海葵的x坐标
    this.x = [];
    //  海葵的y坐标
    this.len = [];
}
// 定义海葵的个数
aneObj.prototype.num = 50;
aneObj.prototype.init = function() {
    for (var i = 0; i < this.num; i ++) {
        //  加上Math.random生成的海葵x坐标和高度就不一致了
        this.x[i] = i * 16 + Math.random() * 20;
        this.len[i] = 200 + Math.random() * 50;
    }
}
aneObj.prototype.draw = function() {
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "#3b154e";
    for (var i = 0; i < this.num; i++) {
        ctx2.beginPath();
        ctx2.moveTo(this.x[i], canHeight);
        ctx2.lineTo(this.x[i], canHeight - this.len[i]);
        ctx2.stroke();
    }
    ctx2.restore();
}
