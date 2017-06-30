$(function(){
	$.ajax({
		url: "data/shopping.json",
		type: "get",
		success: function(data){
			var str = $.cookie("shop");
			if(str){
				var arr = JSON.parse(str);
				var num = 0;
				for(var i in arr){
					var id = parseInt(arr[i].id);
					var x = Math.floor(id%100/10);
					var y = Math.floor(id%1000%100%10);
					var oUl = $("<ul class='clear'><li><input type='checkbox' class='cl' /></li><li><img class='big' src=" + data[x].child[(y-1)].img + " /></li><li><span>" + data[x].child[(y-1)].name + "&nbsp&nbsp&nbsp" + data[x].child[(y-1)].describe + "</span></li><li><p>" + data[x].child[(y-1)].id + "</p></li><li><div><u>" + arr[i].num + "</u></div></li><li><i>" + (parseInt(data[x].child[(y-1)].id) * parseInt(arr[i].num)) + "</i></li><li><em id=" + data[x].child[(y-1)].id + ">x</em></li></ul>")
					$(".box").find("h3").after(oUl);
					var oS = $("<s class='down'>-</s><s class='up'>+</s>")
				}$(".box").find("ul").find("div").append(oS);
			}else{
				$(".box").find("h3").html("<a href='#'>你的购物车空空如也，快去购物吧！</a>");
			}
			enlarge();

			var cl = $(".cl");
			var check = $(".check");
			if($(".check").get(0).checked){
				for(var i=0;i<cl.length;i++){
					cl[i].checked="checked";
				}
			}
			$(".check").click(function(){
				if($(".check").get(0).checked){
					for(var i=0;i<cl.length;i++){
						cl[i].checked="checked";
					}
				}else{
					for(var i=0;i<cl.length;i++){
						cl[i].checked="";
					}
				}
				pay();
			})
			$(".cl").click(function(){
				if(!$(this).get(0).checked){
					check[0].checked = "";
				}
				pay();
			})
			$("em").click(function(){
				id = $(this).attr("id"); 
				var str = $.cookie("shop");
				var arr = JSON.parse(str);
				for(var i in arr){
					if(arr[i].id == id){
						arr.splice(i,1);
						console.log(arr);
						var Str = JSON.stringify(arr);
						$.cookie("shop", Str);
						same = true;
					}
				}
				$(this).parent().parent().remove();
				pay();
			})
			pay();
			$(".down").click(function(){
				var d_num = parseInt($(this).parent().find("u").html())
				if(d_num > 1){
					d_num--;
					var id = $(this).parent().parent().parent().find("em").attr("id");
					var str = $.cookie("shop");
					var x = 0;
					if(str){
						var arr = JSON.parse(str);
						for(var i in arr){
							if(arr[i].id == id){
								num = Number(arr[i].num);
								num--;
								arr[i].num = num;
								x = Number(arr[i].id) * num;
							}
							
						}
						var Str = JSON.stringify(arr);
						$.cookie("shop", Str);
					}
					$(this).parent().parent().parent().find("i").html(x);
					$(this).parent().find("u").html(d_num);
					pay();
				}
				
			})
			$(".up").click(function(){
				var d_num = parseInt($(this).parent().find("u").html())
				if(d_num < 10){
					d_num++;
					var id = $(this).parent().parent().parent().find("em").attr("id");
					var str = $.cookie("shop");
					var x = 0;
					if(str){
						var arr = JSON.parse(str);
						for(var i in arr){
							if(arr[i].id == id){
								num = Number(arr[i].num);
								num++;
								arr[i].num = num;
								x = Number(arr[i].id) * num;
							}
							
						}
						var Str = JSON.stringify(arr);
						$.cookie("shop", Str);
					}
					$(this).parent().parent().parent().find("i").html(x);
					$(this).parent().find("u").html(d_num);
					pay();
				}
				
			})
		},
		error:function(error){
			alert(error);
		}
	})
})

function pay(){
	cartNum();
	checkNum();

}

function cartNum(){
	var str = $.cookie("shop");
	if(str){
		var arr = JSON.parse(str);
		var num = 0;
		for(var i in arr){
			num += Number(arr[i].num);
		}
		$("#fixed").find("span").html(num);
	}
}

function checkNum(){
	var ch_num = 0;
	var money = 0
	$(".cl").each(function(index, item){
		if($(".cl").get(index).checked){
			var id = $(this).parent().parent().find("em").attr("id")
			var str = $.cookie("shop");
			var arr = JSON.parse(str);
			for(var i in arr){
				if(id == arr[i].id){
					ch_num += Number(arr[i].num);
					money += Number(arr[i].num) * Number(arr[i].id)
				}
				
			}	
		}
	})
	$("#fixed").find("i").html(ch_num);
	$("#fixed").find("b").html(money);
}

function enlarge(){
	var l = $("<u class='on'></u>");
	var b = $("<u class='out'></u>");
	$(".big").mouseover(function(){
		$(this).parent().css("position", "relative");
		b.css("background", "url(" + $(this).attr("src") + ") center no-repeat");
		$(this).parent().append(l).append(b);

	})
}


