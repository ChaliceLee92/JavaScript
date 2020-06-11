let Snake = {
	length: 20, //画布边长
	cellLength: 16, //单位长度px
	enemyNum: 1, //食物数量
	snakeLength: 3, //蛇初始长度
	mapLine: true, //显示辅助线
	direct: '+x', //初始方向
	speed: 600, //初始速度，数值越小越快
	myLevel: 1, // 等级
	myScore: 0, //得分
	layer: $('<div id="snake-layer" />'), // 地图盒子
	snake: '<div class="snake snake-body" />', // 蛇 主体
	snakes: [], // 蛇 主体
	runner: null, // 是否运动中
	snakePlace: {}, //蛇头位置
	lineH: '<div class="line lineH" />',
	lineS: '<div class="line lineS" />',
    foods: [],
	moreFoods: false,
	location: 0,

	// 随机 工具函数
	random: function () {
		return Math.floor(Math.random() * this.length);
	},

	// 设置 游戏区域
	drawMap: function () {
		this.layer.css({
			width: this.length * this.cellLength,
			height: this.length * this.cellLength,
		});
		$('body').append(this.layer);
	},

	// 设置 辅助线
	drawLine: function () {
		for (let i = 0; i < this.length - 1; i++) {
			this.layer.append(
				$(this.lineH)
					.css({
						top: i * this.cellLength,
						height: this.cellLength,
					})
					.add(
						$(this.lineS).css({
							left: i * this.cellLength,
							width: this.cellLength,
						})
					)
			);
		}
	},

	// 添加 节点
	addPoint: function (dom, x, y, cb) {
		dom.css({
			width: this.cellLength,
			height: this.cellLength,
			position: 'absolute',
			left: x * this.cellLength,
			top: y * this.cellLength,
		});
		dom.x = x;
		dom.y = y;
		this.layer.append(dom);
		if (typeof cb === 'function') {
			cb(dom);
		}
	},

	// 出现的食物不允许出现在蛇身上
	checkPointInSnake: function (point, correct) {
		let result = false;
		let checkArray = this.snakes.slice(0);

		for (let i = 0; i < checkArray.length; i++) {
			if (point.x === checkArray[i].x && point.y === checkArray[i].y) {
				if (correct) {
					point = {
						x: this.random(),
						y: this.random(),
					};
					this.checkPointInSnake(point);
				} else {
					result = true;
				}
				break;
			}
		}
		if (correct) {
			return point;
		}
		return result;
	},

	//创建食物
	addFood: function (enemyNum) {
        console.log('%c 🍈 enemyNum: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', enemyNum);
		for (let i = 0; i < enemyNum; i++) {
			let ememy_x = this.random();
			let ememy_y = this.random();
			let food = $('<div class="danger" />');
			let point = this.checkPointInSnake(
				{
					x: ememy_x,
					y: ememy_y,
				},
				true
			);
			point.dom = food;
			this.foods.push(point);
			this.addPoint(food, point.x, point.y);
		}
	},

	//游戏得分
	getScore: function () {
		$('#myScore').text(++this.myScore);

		if (this.myScore % 10 === 0) {
			$('#myLevel').text(++this.myLevel);
			this.speed = Math.round(this.speed * 0.8);
		}
	},

	//运动
	run: function () {
		let _this = this;

		switch (_this.direct) {
			case '+x':
				_this.snakePlace.x = _this.snakePlace.x + 1;
				break;
			case '+y':
				_this.snakePlace.y = _this.snakePlace.y - 1;
				break;
			case '-x':
				_this.snakePlace.x = _this.snakePlace.x - 1;
				break;
			case '-y':
				_this.snakePlace.y = _this.snakePlace.y + 1;
				break;
			default:
		}

		//边界检测
		if (_this.snakePlace.x >= _this.length || _this.snakePlace.x < 0 || _this.snakePlace.y >= _this.length || _this.snakePlace.y < 0) {
			clearInterval(_this.runner);

			if (window.localStorage) {
				let lastScore = parseInt(localStorage.getItem('snake-score') || 0);

				if (_this.myScore > lastScore) {
					localStorage.setItem('snake-score', _this.myScore);
					return alert('恭喜您 , 创造了新的记录！');
				}
			}
			return alert('游戏结束！');
		}
		//自身检测
		if (_this.checkPointInSnake(_this.snakePlace)) {
			clearInterval(_this.runner);
			return alert('游戏结束！');
		}

		$('.snakeHead').removeClass('snakeHead');

		//食物检测
		let hasFood;

		// 循环盛载食物的容器
		for (let i = 0; i < _this.foods.length; i++) {
			// 判断是否 吃 中食物
			if (_this.snakePlace.x === _this.foods[i].x && _this.snakePlace.y === _this.foods[i].y) {
				// 添加到蛇身
				_this.addPoint($(_this.snake).addClass('snakeHead'), _this.snakePlace.x, _this.snakePlace.y, function (dom) {
					_this.snakes.push(dom);
				});
				// 中
				hasFood = true;
				// 删除 食物数组的一项
				_this.foods[i].dom.remove();
				_this.foods.splice(i, 1);
				break;
			}
		}
		// 吃中食物
		if (hasFood) {
			// 重新生成食物
			_this.addFood(1);
			// 获取分数
			_this.getScore();

			clearInterval(_this.runner);

			_this.runner = setInterval(_this.run.bind(_this), _this.speed);
		} else {
			let footer = _this.snakes.shift();

			footer
				.css({
					top: _this.snakePlace.y * _this.cellLength,
					left: _this.snakePlace.x * _this.cellLength,
				})
				.addClass('snakeHead');
			footer.x = _this.snakePlace.x;
			footer.y = _this.snakePlace.y;
			_this.snakes.push(footer);
		}
	},

	//画蛇
	drawSnake: function () {
		let _this = this;
		for (let i = 0; i < this.snakeLength; i++) {
			let _x = Math.floor(this.location / 2);
			let _y = _x;
			switch (this.direct) {
				case '+x':
					_x += i;
					break;
				case '+y':
					_y -= i;
					break;
				case '-x':
					_x -= i;
					break;
				case '-y':
					_y += i;
					break;
				default:
			}
			this.addPoint($(this.snake), _x, _y, function (dom) {
				//蛇头 注意 this 指针 , 把 数组最后一个元素 变成 蛇头
				if (i === _this.snakeLength - 1) {
					_this.snakePlace = {
						x: _x,
						y: _y,
					};
					dom.addClass('snakeHead');
				}
				_this.snakes.push(dom);
			});
		}
	},

	//控制
	onkeydown: function () {
		let _this = this;
		document.onkeydown = function (e) {
			switch (e.keyCode) {
				case 38:
					//up
					_this.direct = '+y';

					break;
				case 40:
					//down
					_this.direct = '-y';
					break;
				case 37:
					//left
					_this.direct = '-x';
					break;
				case 39:
					//right
					_this.direct = '+x';
					break;
				default:
			}
		};
	},

	// 按钮 等视图
	drawView: function () {
		let _this = this;

		let str = `
            <div class="handle">
                <div>
                    关卡：<span id="myLevel">${this.myLevel}</span> 
                    得分：<span id="myScore">${this.myScore}</span>
                </div>
                <button class="btn" id="Start">开始</button> 
                <button class="btn" id="Pause">暂停</button> 
                <button class="btn" id="Restart">重新开始</button> 
                <button class="btn" id="toggleLine">切换辅助线</button>
                <button class="btn" id="moreFoods">切换饥饿模式</button>
                <p class="m">点击开始，使用上、下、左、右箭头操作</p>
            </div>
        `;

		$('body')
			.append(str)
			.on('click', '.btn', function () {
				let btnid = $(this).attr('id');
				switch (btnid) {
					case 'Start':
						_this.onkeydown.call(_this);
						_this.runner = setInterval(_this.run.bind(_this), _this.speed);
						break;
					case 'Pause':
						clearInterval(_this.runner);
						break;
					case 'Onlyone':
						_this.addFood(1);
						break;
					case 'toggleLine':
						_this.layer.toggleClass('noborder');
						break;
					case 'Restart':
						window.location.reload();
						break;
                    case 'moreFoods':
                        $('.danger').removeClass()

                        _this.moreFoods = !_this.moreFoods

                        if (_this.moreFoods) {
                            $('#moreFoods').text('切换温饱模式')
                            _this.foods = []
                            _this.addFood(_this.length * 0.5);
                        } else {
                            $('#moreFoods').text('切换饥饿模式')
                            _this.foods = []
                            _this.addFood(1);
                        }
						break;
					default:
				}
			});
	},

	initSnake: function () {
		//画地图
		this.drawMap();
		// 辅助线
		if (this.mapLine) {
			this.drawLine();
        }
        
		//画食物
		this.addFood(this.enemyNum);
		this.drawSnake();
		this.drawView();
	},
};

Snake.initSnake();
