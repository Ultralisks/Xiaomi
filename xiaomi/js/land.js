$(function(){
	$("#land").click(function(){
		land();
		return false;
	});
	$("#register").click(function(){
		register();
		return false;
	})
	
	
})
//登陆
var land = (function(){
	var oDiv = null;
	var createDiv = function(){
		if(!oDiv){
			$("<div id='landing'></div>");

		}
	}
	return createDiv;
})();
//注册
var register = (function(){
	var oDiv = null;
	var createDiv = function(){

	}
})();
// 购物车
function cart(){

}