// 数据
let movieArray = [
	{
		img: 'bianxingjingang.jpg',
		movieName: '变形金刚',
		star: '希亚·拉伯夫',
		direct: '迈克尔·贝',
		type: 'd动作',
		time: '2007年07月03日',
	},
	{
		img: 'qiannvyouhun.jpg',
		movieName: '倩女幽魂',
		star: '张国荣',
		direct: '程小东',
		type: 'j惊悚',
		time: '1987年7月18日',
	},
	{
		img: 'gongfu.jpg',
		movieName: '功夫',
		star: '周星驰',
		direct: '周星驰',
		type: 'x喜剧',
		time: '2014年12月24日',
	},
	{
		img: 'suduyujiqing.jpg',
		movieName: '速度与激情',
		star: '保罗·沃克',
		direct: '罗伯·科恩',
		type: 'd动作',
		time: '2015年4月3日',
	},
	{
		img: 'dahuaxiyou.jpg',
		movieName: '大话西游',
		star: '周星驰',
		direct: '刘镇伟',
		type: 'a爱情',
		time: '2014年10月24日',
	},
];

function getDocument(dom) {
	return document.querySelector(dom);
}

function Table(dom) {
	this.table = getDocument(dom);
}

Table.prototype.init = function (dataList) {
	this.initThead();
	this.initTbody(dataList);
	this.initSort(dataList);
};

Table.prototype.initThead = function () {
	let thead = document.createElement('thead');

	thead.innerHTML = `<tr>
                            <th falg="img">影片</th>
                            <th falg="star">主演</th>
                            <th falg="direct">导演</th>
                            <th falg="type">类别</th>
                            <th falg="time">上映时间</th>
                        </tr>`;

	this.table.appendChild(thead);
};

Table.prototype.initTbody = function (dataList) {
	if (getDocument('#subTbody')) {
		this.table.removeChild(getDocument('#subTbody'));
	}

	let tbody = document.createElement('tbody');

	tbody.id = 'subTbody';

	let arr = [];
	for (let i = 0; i < dataList.length; i++) {
		const ele = dataList[i];

		let str = `<tr>
                        <td>
                            <img class="img" src=images/${ele.img}>
                            <br /> ${ele.movieName} 
                        </td>
                        <td>${ele.star}</td>
                        <td>${ele.direct}</td>
                        <td>${ele.type}</td>
                        <td>${ele.time}</td>
                    </tr>`;

		arr.push(str);
	}
	tbody.innerHTML = arr.join('');

	this.table.appendChild(tbody);
};

Table.prototype.TableSort = function (dataList, attr) {
	function fn(attr) {
		return function (obj1, obj2) {
			if (obj1[attr] < obj2[attr]) {
				return 1;
			} else if (obj1[attr] == obj2[attr]) {
				return 0;
			} else {
				return -1;
			}
		};
	}
	let res = fn(attr);

	dataList.sort(res);
};

Table.prototype.initSort = function (dataList) {
    let ths = document.querySelectorAll('th');
    
    let self = this

    // 点击表头排序
	ths.forEach(item => {
        item.onclick = function () {
            let falg = this.getAttribute('falg');
            
            self.TableSort(dataList, falg);
            
			self.initTbody(dataList);
		};
	});
};

// new实例对象
let table = new Table("table");
// 调用实例的原型方法
table.init(movieArray);