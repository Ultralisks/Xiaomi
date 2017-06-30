$(function(){
	$.ajax({
		url:"data/shopping.json",
		type:"get",
		success:function(data){
			shopping(data);
		}
	})
})

function shopping(data){
	for(var i = 0; i < data.length; i++){
		$("#main").find(".margin").find("div").eq(i).find("h3").html(data[i].title);
		if(data[i].child.length >= 5){
			$("<a href='#'>查看更多 <span class='glyphicon glyphicon-menu-right'></span></a>").appendTo($("#main").find(".margin").find("div").eq(i).find("h3"));
		}
		var html = "";
		for(var j = 0; j < data[i].child.length; j++){
			html += "<li class='active'><a href=" + data[i].child[j].href + "><img src=" + data[i].child[j].img + " /><p>" + data[i].child[j].name + "</p><span>" + data[i].child[j].describe + "</span></a><input type='button' class='add' value='加入购物车' id=" +data[i].child[j].id + " /></li>";
			$("#main").find(".margin").find("div").eq(i).find("ul").html(html);
		}
	}
	$("#main").find(".margin").find("div").find("ul").find("li").hover(function(){
		$(this).find("input").stop().animate({"margin-top": "43"}, 200);
	}, function(){
		$(this).find("input").stop().animate({"margin-top": "81"}, 200);
	});
	addshop();
	cartnum();
}

function addshop(){
	$("#main").find("input").click(function(){
		var id = $(this).attr("id");
		var newone = $.cookie("shop") == null ? true : false;
		var same = false;
		if(newone){
			$.cookie("shop", '[{"id":' + id + ', "num":"1"}]', {expires: 7, path:'/'});
		}else{
			var str = $.cookie("shop");
			var arr = JSON.parse(str);
			for(var i in arr){
				if(arr[i].id == id){
					arr[i].num++;
					var Str = JSON.stringify(arr);
					$.cookie("shop", Str);
					same = true;
				}
			}
			if(!same){
				var obj = {
					id: id,
					num: 1
				}
				arr.push(obj);
				var Str = JSON.stringify(arr);
				$.cookie("shop", Str);
			}
		}
		cartnum();
		alert("加入购物车成功");
	})
}

function cartnum(){
	var str = $.cookie("shop");
	if(str){
		//如果购物车内商品不为空的话
		var arr = JSON.parse(str);
		var num = 0; //记录累加的和
		for(var i in arr){
			num += Number(arr[i].num);
		}
		if(num > 0){
			$("#cart").css("color", "#fff").parent().css("background", "#f60");
		}
		$("#cart").find(".num").html(num);
	}
}

