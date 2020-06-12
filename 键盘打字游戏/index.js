let start = document.getElementById('start');
let times = document.getElementById('times');
let score = document.getElementById('score');
let canvas = document.getElementById('myCanvas');

score.innerHTML = 0

// canvas 画布
let cxt = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

// 26 个字母
let letStr = 'abcdefghijklmnopqrstuvwsyz';

//随机数
function rand(min, max) {
	return parseInt(Math.random() * (max - min + 1) + min);
}

//创建字母对象
function Letter() {
    this.x = rand(0, canvas.width - 25);
	this.y = 0;
	this.speedY = rand(1, 6);
	this.val = letStr[rand(0, 25)];
	this.color = ['#c1d4cd', '#d7bfe3', '#db9199'];
}

//画的方法
Letter.prototype.draw = function () {
	cxt.font = '20px verdana';
	cxt.fillStyle = this.color[rand(0, 2)];
	cxt.shadowColor = 'darkblue';
	cxt.shadowBlur = 15;
	cxt.fillText(this.val, this.x, this.y);
};

//移动的方法
Letter.prototype.move = function () {
	this.y += this.speedY;
};

//删除超除屏幕的对象
Letter.prototype.clear = function () {
	if (this.y >= canvas.height) {
		return true;
	} else {
		return false;
	}
};
//盛放对象的数组
let letterArr = [];
//控制对象产生速度的数字
let index = 0;
let timer = null;
let game = null;
start.onclick = function () {
	clearInterval(timer);
	clearInterval(game);
	game = setInterval(function () {
		cxt.clearRect(0, 0, canvas.width, canvas.height);
		//先创建对象
		if (index % 20 == 0) {
			index++;
			let letter = new Letter();
			letterArr.push(letter);
        }
        
		for (let i = 0; i < letterArr.length; i++) {
			letterArr[i].move();
			if (letterArr[i].clear()) {
				letterArr.splice(i, 1);
				i--;
			} else {
				letterArr[i].draw();
			}
		}
		index++;
	}, 30);
	//倒计时

	timer = setInterval(function () {
		times.innerHTML = times.innerHTML - 0 - 1;
		if (times.innerHTML == 0) {
			clearInterval(1);
			clearInterval(2);
			alert('分数是:' + score.innerHTML);
			location.reload();
		}
    }, 1000);
    
	document.onkeypress = function (ev) {
		let evObj = ev || window.event;
		//将对应的ASC转成字符
        let str = String.fromCharCode(evObj.keyCode);
        
		for (let i = 0; i < letterArr.length; i++) {
			if (letterArr[i].val == str) {
				letterArr.splice(i, 1);
				i--;
				score.innerHTML = score.innerHTML - 0 + 1;
				break;
			}
        }
        
	};
};
