$('#login-button').click(function (event) {
	var userName = document.getElementById('userName').value;
	var pwd = document.getElementById('pwd').value;
	if (userName == '思思小仙女' && pwd == '0421') {
		event.preventDefault();
		$('form').fadeOut(500);
		$('.wrapper').addClass('form-success');
		requestFullScreen();
		setTimeout(function () {
			location.href = 'index1.html';
		}, 2000);
	} else {
		alert('密码是你的生日哦!（密码为4位数）');
	}
});

function requestFullScreen(element) {
	var element = document.documentElement;
	// 判断各种浏览器，找到正确的方法
	//alert(element.webkitRequestFullScreen);
	var requestMethod =
		element.requestFullScreen || //W3C
		element.webkitRequestFullScreen || //Chrome等
		element.mozRequestFullScreen || //FireFox
		element.msRequestFullScreen; //IE11
	if (requestMethod) {
		requestMethod.call(element);
	} else if (typeof window.ActiveXObject !== 'undefined') {
		//for Internet Explorer
		var wscript = new ActiveXObject('WScript.Shell');
		if (wscript !== null) {
			wscript.SendKeys('{F11}');
		}
	}
}
function changeFrameHeight() {
	var ifm = document.getElementById('iframepage');
	ifm.height = document.documentElement.clientHeight;
}

window.onresize = function () {
	changeFrameHeight();
};
