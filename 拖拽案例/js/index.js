let btn = document.getElementById('btn');
let dialog = document.querySelector('.dialog');
let mask = document.querySelector('.mask');
let close = document.querySelector('.close');
let title = document.getElementById('title');

btn.onclick = e => {
	dialog.style.display = 'block';
	mask.style.display = 'block';
};

close.onclick = e => {
	dialog.style.display = 'none';
	mask.style.display = 'none';
};

//  获取此时可视区域的横坐标
title.onmousedown = e => {
	let spaceX = e.clientX - dialog.offsetLeft;
	let spaceY = e.clientY - dialog.offsetTop;

	document.onmousemove = e => {
		let x = e.clientX - spaceX;
		let y = e.clientY - spaceY;
		dialog.style.left = x + 'px';
		dialog.style.top = y + 'px';
	};

	document.onmouseup = () => {
		document.onmousemove = null;
	};
};
