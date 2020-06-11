window.onload = function () {
	let wrap = document.getElementById('wrap');
	let arrow = document.getElementById('arrow');
	let slide = document.getElementById('slide');
	let ul = slide.children[0];
	// 鼠标经过轮播图，箭头缓缓出现
	wrap.onmouseenter = function () {
		arrow.style.opacity = 1;
	};
	// 鼠标离开轮播图，箭头缓缓消失
	wrap.onmouseleave = function () {
		arrow.style.opacity = 0;
	};
	// 生成ul>li
	for (let i = 0; i < 5; i++) {
		let li = document.createElement('li');
		li.style.backgroundImage = 'url("images/slidepic' + (i + 1) + '.jpg")';
		ul.appendChild(li);
	}

	// 设置图片位置
	let config = [
		{
			width: 320,
			height: 180,
			top: 0,
			left: 100,
			opacity: 0.4,
			zIndex: 2,
		},
		{
			width: 640,
			height: 360,
			top: 100,
			left: 0,
			opacity: 0.8,
			zIndex: 3,
		},
		{
			width: 800,
			height: 450,
			top: 150,
			left: 280,
			opacity: 1,
			zIndex: 4,
		},
		{
			width: 640,
			height: 360,
			top: 100,
			left: 740,
			opacity: 0.8,
			zIndex: 3,
		},
		{
			width: 320,
			height: 180,
			top: 0,
			left: 960,
			opacity: 0.4,
			zIndex: 2,
		},
	];

	LocationChange();

	let arrLeft = document.getElementById('arrLeft');
	let arrRight = document.getElementById('arrRight');
	let flag = true; //添加节流阀

	// 左箭头点击事件
	arrLeft.onclick = function () {
		if (flag === true) {
			flag = false;
			config.push(config.shift());
			LocationChange();
		}
	};

	//右箭头点击事件
	arrRight.onclick = function () {
		if (flag === true) {
			flag = false;
			config.unshift(config.pop());
			LocationChange();
		}
	};

	// 让所有的图片以动画的形式到达指定的位置
	function LocationChange() {
		for (let i = 0; i < ul.children.length; i++) {
			animate(ul.children[i], config[i], function () {
				flag = true;
			});
		}
	}

	/**
	 * getStyle 封装获取计算后样式属性值的兼容函数
	 * @param {*} obj 要获取属性的对象
	 * @param {*} attr 要获取的属性
	 */
	function getStyle(obj, attr) {
		if (window.getComputedStyle) {
			return window.getComputedStyle(obj, null)[attr];
		} else {
			return obj.currentStyle[attr];
		}
	}

	let timer = null;
	/**
	 * animate 封装可以改变多个属性值带有回调函数的缓动函数
	 * @param {*} obj 要修改的对象
	 * @param {*} json 多个{属性:属性值}的对象
	 * @param {*} fn 回调函数
	 * 所有属性都到达目标值后才能清理定时器
	 */
	function animate(obj, json, fn) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function () {
			let flag = true; //flag标记所有属性是否达到对应属性值
			for (let k in json) {
				if (k === 'opacity') {
					//传入的属性是透明度 opacity
					let leader = getStyle(obj, k) * 100;
					let target = json[k] * 100;
					let step = (target - leader) / 10;
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
					leader += step;
					obj.style[k] = leader / 100;
				} else if (k === 'zIndex') {
					//传入属性是层级，无需缓动
					obj.style.zIndex = json[k];
				} else {
					//改变一般单位为px的属性
					let leader = parseInt(getStyle(obj, k)) || 0;
					let target = json[k];
					let step = (target - leader) / 10;
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
					leader += step;
					obj.style[k] = leader + 'px';
					if (leader !== target) flag = false;
				}
			}
			if (flag) {
				clearInterval(obj.timer); //所有属性达到对应属性值后清理定时器
				if (fn) {
					//调用回调函数
					fn();
				}
			}
		}, 15);
	}
};
