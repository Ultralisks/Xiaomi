$(function(){
	// 导航
	$.ajax({
		url: "data/nav.json",
		type: "get",
		success: function(data){
			navAjax(data);
		},
		error: function(error){
			console.log(error);
		}
	});
	
	// 搜索框  轮播图
	$.ajax({
		url:"data/slide.json",
		type:"get",
		success:function(data){
			search(data);
		},
		error:function(error){
			console.log(error);
		}
	});
	slideClick();

	//侧边栏
	$.ajax({
		url: "data/sidebar.json",
		type: "post",
		success: function(data){
			sidebar(data);
		},
		error: function(error){
			console.log(error);
		},
		dataType: "json"
	});
	
	//明星产品
	star();

	// 产品
	$.ajax({
		url: "data/main.json",
		type: "post",
		success: function(data){
			$("#main").find("dl").on("mouseover", "dt", function(){
				$(this).parent().find("dt").attr("class", "");
				$(this).attr("class", "mouseover");
				mainMouseover(data, $(this));
			})
			mainMouseover(data, false);
			 
		},
		error: function(){
			alert(error);
		}
	})

	//推荐
	$.ajax({
		url:"data/slide.json",
		type:"get",
		success:function(data){
			for(var k = 0; k < data[2].child.length; k++){
					$("#commend").find("li").eq(k).find("a").attr("href", data[2].child[k].href);
					$("#commend").find("li").eq(k).find("img").attr("src", data[2].child[k].img);
					$("#commend").find("li").eq(k).find("span").html(data[2].child[k].name);
					$("#commend").find("li").eq(k).find("p").html(data[2].child[k].describe);
					$("#commend").find("li").eq(k).find("i").html(data[2].child[k].price);commend();
				}
		},
		error:function(error){
			alert(error);
		}

	})
	
	$.ajax({
		url: "data/hot.json",
		type: "get",
		success: function(data){
			for(var i = 0; i < data[0].child.length; i++){
				$("#hot").find("ul").find("li").eq(i).find("img").attr("src", data[0].child[i].img);
				$("#hot").find("ul").find("li").eq(i).find("a").attr("href", data[0].child[i].href1);
				$("#hot").find("ul").find("li").eq(i).find("a").eq(1).attr("href", data[0].child[i].href2);
				$("#hot").find("ul").find("li").eq(i).find("p").find("a").html(data[0].child[i].describe);
				$("#hot").find("ul").find("li").eq(i).find("span").html("来自于" + data[0].child[i].by + "的评价");
				$("#hot").find("ul").find("li").eq(i).find("div").find("a").html(data[0].child[i].name);
				$("#hot").find("ul").find("li").eq(i).find("b").html(data[0].child[i].price);
			}
		},
		error: function(){
			alert(error);
		}
	})

	//内容
	$.ajax({
		url:"data/content.json",
		type:"get",
		success:function(data){
			content(data);
		},
		error:function(){
			alert(error);
		}

	})

	cartnum();

	//hover动画

})

function navAjax(data){
	$(".header-c").on("mouseover", "li", function(){
		var html = "";
		var x = $(this).index()
		if(x || x == 0){
			for(var i = 0; i < data[x].child.length; i++){
				html += "<dt>";
				if(data[x].child[i].top){
					html += "<p>" + data[x].child[i].top + "</p>";
				}
				html += "<a href = " + data[x].child[i].href + "><img src=" + data[x].child[i].img + " id =" + data[x].child[i].id + " /></a><a href=" + data[x].child[i].href + " >" + data[x].child[i].name + "</a>";
				if(data[x].child[i].price){
					html += "<br/><span>" + data[x].child[i].price + "</span></dt>";
				}
			}
			$("#top_details").find($(".margin")).html(html);
			
		}
		$("#top_details").stop().animate({"height":"230", "top": "140", "z-index": "5"}, 200);
	});
	$("#top_details").mouseover(function(){
		$("#top_details").stop().animate({"height":"230", "top": "140", "z-index": "5"}, 200);
	});
	$(".header-c").mouseout(function(){
		$("#top_details").stop().animate({"height":"0", "top":"100", "z-index": "-1"}, 200, function(){
			$("#top_details").find($(".margin")).html("");
		});
	});
}


function search(data){
	//搜索框标签
	for(var i = 0; i < data[0].child.length; i++){
		$("<a>").appendTo($(".search")).attr({"index":i, "href":data[0].child[i].href, "class":"sea_a"}).html(data[0].child[i].name);
	}

	// 广告轮播图
	for(var j = 0; j < data[1].child.length; j++){
		$(".advert").find("a").eq(j).attr("href", data[1].child[j].href).find("img").attr("src", data[1].child[j].img);
	}
	slide();
	//明星单品
	for(var k = 0; k < data[2].child.length; k++){
		$("#star").find("li").eq(k).find("a").attr("href", data[2].child[k].href);
		$("#star").find("li").eq(k).find("img").attr("src", data[2].child[k].img);
		$("#star").find("li").eq(k).find("span").html(data[2].child[k].name);
		$("#star").find("li").eq(k).find("p").html(data[2].child[k].describe);
		$("#star").find("li").eq(k).find("i").html(data[2].child[k].price);
	}
}

//侧边栏
function sidebar(data){
	$(".slideshow").on("mouseover", "li", function(){	
		var html = "";
		var x = $(this).index();
		for(var i = 0; i < data[0].child[x].child.length; i++){
			html += "<dt>";
			if(data[0].child[x].child[i].buy){
				html += "<p>选购</p>";
			}
			html += "<a href = " + data[0].child[x].child[i].href + "><img src=" + data[0].child[x].child[i].img + " id =" + data[0].child[x].child[i].id + " />" + data[0].child[x].child[i].name + "</a>";
		}
		$(".slideshow-r").html(html);
		switch(Math.floor(data[0].child[x].child.length / 6)){
			case 0: $(".slideshow-r").css("width", "248");
			break;
			case 1: $(".slideshow-r").css("width", "496");
			break;
			case 2: $(".slideshow-r").css("width", "744");
			break;
			default: $(".slideshow-r").css("width", "992");
			break;
		}
		$(".slideshow-r").css("display", "flex");
	});
	$(".slideshow-r").mouseover(function(){
		$(".slideshow-r").css("display", "flex");
	});
	$(".slideshow").mouseout(function(){
		$(".slideshow-r").css("display", "none");
	});
}


function content(data){
	for(var i = 0;i < 4; i++){
		for(var j = 0; j < data[i].child.length; j++){
			$("#content").find("li").eq(i).find(".last").before($("<dt><a href=" + data[i].child[j].href + "><span>" + data[i].child[j].name + "</span><p>" + data[i].child[j].describe + "</p><i>" + data[i].child[j].price + "</i><img src=" + data[i].child[j].img + " />" + "</a></dt>"))
			$("#content").find("li").eq(i).find("h4").css("color", data[i].color);
			$("#content").find("li").eq(i).find("input").css({"color": data[i].color, "border-color": data[i].color});
			
			$("#content").find("li").eq(i).find("div").append($("<p></p>"));
			$("#content").find("li").eq(i).find("div").find("p").eq(0).attr("class", "click");
			$("#content").find("li").eq(i).find("div").find("p").click(function(){
				var x = $(this).index() * 300;
				x = 0 - x;
				$(this).parent().parent().find("dl").animate({"left": x}, 200);
				$(this).parent().find("p").attr("class", "");
				$(this).attr("class", "click");
			})
		}
	}
}



function slide(){
	var index = 1;

	$(".advert").find("a").eq(0).animate({"opacity": 1}, 300);
	setInterval(function(){
		$(".advert").find("a").eq(index).animate({"opacity": 1}, 300);
		if(index == 0){
			$(".advert").find("a").eq(4).animate({"opacity": 0}, 300);
		}else{
			$(".advert").find("a").eq(index - 1).animate({"opacity": 0}, 300);
		}
		$(".advert").find("dl").find("dt").attr("class", "");
		$(".advert").find("dl").find("dt").eq(index).attr("class", "click");
		if(index == 4){
			index -= 5;
		}
		index++;
	}, 2000);
}

function slideClick(){
	$(".advert").find("dl").on("click", "dt", function(){
		index = $(this).index();
		$(".advert").find("dl").find("dt").attr("class", "");
		$(".advert").find("dl").find("dt").eq(index).attr("class", "click");
		$(".advert").find("a").animate({"opacity": 0}, 300);
		$(".advert").find("a").eq(index).animate({"opacity": 1}, 300);
	})
}


function star(){
	var l = true;
	var timerStar = setInterval(function(){
		if(l){
			$(".star-b").animate({"left": -992}, 200);
			l = false;
		}else{
			$(".star-b").animate({"left": 0}, 200);
			l = true;
		}
	}, 3000);
	$(".star-l").click(function(){
		$(".star-b").animate({"left": 0}, 200);
		l = true;
	});
	$(".star-r").click(function(){
		$(".star-b").animate({"left": -992}, 200);
		l = false;
	});
}


function commend(){
	var l = true;
	var timerStar = setInterval(function(){
		if(l){
			$(".commend-b").animate({"left": -992}, 200);
			l = false;
		}else{
			$(".commend-b").animate({"left": 0}, 200);
			l = true;
		}
	}, 3000);
	$(".commend-l").click(function(){
		$(".commend-b").animate({"left": 0}, 200);
		l = true;
	});
	$(".commend-r").click(function(){
		$(".commend-b").animate({"left": -992}, 200);
		l = false;
	});
}


function mainMouseover(data, _this){
	if(_this){
		var i = _this.parent().parent().parent().index();
		var index = _this.index();
		for(var j = 0; j < data[i].child[index].child.length; j++){
			$("." + data[i].title).find("ul").find("li").eq(j).find("a").attr("href", data[i].child[index].child[i].href);

			$("." + data[i].title).find("ul").find("li").eq(j).find("img").attr("src", data[i].child[index].child[i].img);

			$("." + data[i].title).find("ul").find("li").eq(j).find("span").html(data[i].child[index].child[i].name);

			$("." + data[i].title).find("ul").find("li").eq(j).find("p").html(data[i].child[index].child[i].describe);

			$("." + data[i].title).find("ul").find("li").eq(j).find("i").html(data[i].child[index].child[i].price);
			
			$("." + data[i].title).find("ul").find("li").eq(j).find("b").html(data[i].child[index].child[i].rate);
			
			$("." + data[i].title).find("ul").find("li").eq(j).find("em").html("来自于" + data[i].child[index].child[i].by + "的评价");
		}
		$("." + data[i].title).find("ul").find("li").eq(8).find("p").html(data[i].child[index].title);
	}else{

		for(var i = 0; i < data.length; i++){
			for(var j = 0; j < data[i].child[0].child.length; j++){
			$("." + data[i].title).find("ul").find("li").eq(j).find("a").attr("href", data[i].child[0].child[i].href);

			$("." + data[i].title).find("ul").find("li").eq(j).find("img").attr("src", data[i].child[0].child[i].img);

			$("." + data[i].title).find("ul").find("li").eq(j).find("span").html(data[i].child[0].child[i].name);

			$("." + data[i].title).find("ul").find("li").eq(j).find("p").html(data[i].child[0].child[i].describe);

			$("." + data[i].title).find("ul").find("li").eq(j).find("i").html(data[i].child[0].child[i].price);
			
			$("." + data[i].title).find("ul").find("li").eq(j).find("b").html(data[i].child[0].child[i].rate);
			
			$("." + data[i].title).find("ul").find("li").eq(j).find("em").html("来自于" + data[i].child[0].child[i].by + "的评价");
		}
		$("." + data[i].title).find("ul").find("li").eq(8).find("p").html(data[i].child[0].title);
		}
	}
		
	// 
}


function mainHover(){
	$("#main").find("div").find("a").hover(function(){
		
	},function(){
		
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



