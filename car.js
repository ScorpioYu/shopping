//创建表格
// 功能2：点击全选（表头中的多选框）实现表体中的全选功能以及总价格计算
// 功能3：点击加减按钮操作
//  ① 点击加减按钮实现数量加1和减1（数量限制至少是1，至多不限）
//  ② 并且实现当前行的多选框为选中状态，以及当前行小计的计算最后总价格的计算。
// 功能4：点击删除实现删除当前行
// 功能5：点击清空购物车实现表体中的清空功能和总价格归为0

var json = [
	{
		name: "自行车",
		num: "2",
		price: 200
	},
	{
		name: "iphoneXs",
		num: "1",
		price: 12000
	},
	{
		name: "奶粉",
		num: "3",
		price: 40
	},
	{
		name: "笔记本",
		num: "1",
		price: 15000
	}
]

var n = 0;
var lock = true;
$("#clear").prop("disabled",true);
$("#remove").prop("disabled",true);
$("#all").prop("disabled",true);
/*创建*/
$("#add").on("click", function(){
	if(lock){
		lock = false;
		$("#add").prop("disabled",true);
		$("#clear").prop("disabled",false);
		$("#all").prop("disabled",false);
		for(var i = 0; i < json.length; i++){
			$("tbody").append("<tr> " +
	        "<td><input type='checkbox' /></td>" +
	        "<td>" + json[i].name + "</td>" +
	        "<td><input type='button' class='reduce' value='-' >" +
	        "<input type='text' class='num' value='" + json[i].num + "' readonly >" +
	        "<input type='button' class='add' value='+' ></td>" +
	        "<td class='price'>" + json[i].price + "</td>" +
	        "<td class='total'>" + json[i].num * json[i].price + "</td>" +
	        "<td><a href='javascript:void(0);' class='delete'>删除</a></td>" +
	        "</tr>");
		};
		/*加加*/
		$(".add").on("click", function(){
			var num = $(this).prev().val();
			num++;
			$(this).parents("td").find(".num").val(num)
			$(this).parents("td").find(".reduce").prop("disabled",false);
			getToatl();
		});
		/*减减*/
		$(".reduce").on("click", function(){
			var num = $(this).next().val();
			num--;
			if(num == 0){
				$(this).prop("disabled",true);
			}
			$(this).parents("td").find(".num").val(num)
			getToatl();
		});
		/*全选*/
		$("#all").on("click",function(){
			if($(this).prop("checked")){
				$("td input[type='checkbox']").prop("checked",true);
			}else{
				$("td input[type='checkbox']").prop("checked",false);
			}
			getPitch();
			getAllToatl();
		});

		$("td input[type='checkbox']").on("click",function(){
			getToatl();
			if($(this).prop("checked")){
				n++;
			}else{
				n--;
			}
			getPitch();
			getAllToatl();
			if($("td input[type='checkbox']:checked").length == $("td input[type='checkbox']").length){
				$("#all").prop("checked",true);
			}else{
				$("#all").prop("checked",false);
			}
		});
		/*删除*/
		$(".delete").on("click",function (){
			var del = confirm("确认删除商品，该行为不可撤销");
			if(del){
				$(this).parents("tr").remove();
				getPitch();
				getAllToatl();
			};
		});
	}
});

function getToatl(){
	$(".total").each(function(i,val){
		var priceToatl = $(this).parents("tr").find(".price").text() - 0;
		var numToatl = $(this).parents("tr").find(".num").val() - 0;
		$(this).text(priceToatl * numToatl);
	});
	getAllToatl();
};

function getAllToatl(){
	var sums = 0;
	$("td input[type='checkbox']:checked").each(function(i,val){
		var nums = $(this).parents("tr").find(".total").text() - 0;
		sums += nums;
	});
	$(".totals").html(sums);
};

/*清空*/
$("#clear").on("click",function (){
	$("tbody").empty();
	getPitch();
	getAllToatl();
	$("#add").prop("disabled",false);
	$("#remove").prop("disabled",true);
	$("#clear").prop("disabled",true);
	$("#all").prop({
		disabled: true,
		checked: false
	});
	lock = true;
});

/*删除选中项*/
$("#remove").on("click",function (){
	var del = confirm("确认删除商品，该行为不可撤销");
	if(del){
		$("td input[type='checkbox']:checked").each(function(i,val){
			$(this).parents("tr").remove();
		});
		$("#all").prop("checked", false);
		getPitch();
		getAllToatl();
	};
});

/*获取选中的个数*/
function getPitch(){
	$("td input[type='checkbox']:checked").length > 0 ? $("#remove").prop("disabled",false) : $("#remove").prop("disabled",true);
	$(".checkeds").text($("td input[type='checkbox']:checked").length);
};
