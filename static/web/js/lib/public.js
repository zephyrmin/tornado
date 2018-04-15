function refreshLoginBar(fn) {
	$.postH(app+'/member/index/loginbar',{},function (html) {
		$('#header .headerbar').html(html);
		//首页头部下载APP，会员下拉框，购物袋
		$("#header .headerApp").hover(function(){
			$(this).children(".headerApp_m").fadeIn(150);
		},function(){
			$(this).children(".headerApp_m").fadeOut(150);
		});
		$("#header .headerUser").hover(function(){
			$(this).children(".headerUser_info").fadeIn(150);
		},function(){
			$(this).children(".headerUser_info").fadeOut(150);
		});
		$("#header .headerCart").hover(function(){
			$(this).children(".headerCart_m").fadeIn(150);
		},function(){
			$(this).children(".headerCart_m").fadeOut(150);
		});
		if($.isFunction(fn)) fn();
	});
}

//购物袋
function cart() {
	$.post('/member/cart/checkedPrice','',function (r) {
		var r = $.isPlainObject(r)?r:$.parseJSON(r);
		if (r.status){
			if (r.data.product_rows !='') {
				//alert(typeof(r.data.product_rows));
                var info = [];
                var total_price = 0;
                var num = r.data.product_rows.length;
                for(var i = 0 ; i < num ; i++ ){
                	if (i < 3){
                        info.push(i);
                        info[i] = '';
                        // info[i] += '<div class="headerCpro_m clearfix"><input type="hidden" id="id" value="'+r.data.product_rows[i]['id']+'">';
                        info[i] += '<div class="headerCpro_m clearfix">';
                        info[i] += '<div class="all_img headerCpro_img float_l"><a href="/product/detail/id/'+r.data.product_rows[i]['id']+'/saleid/'+r.data.product_rows[i]['spu']+'.html" title="" target="_blank"><img src="'+r.data.product_rows[i]['img_url'] +'" width="60" /></a></div>';

						if(r.data.product_rows[i]['size'] == ""){
							info[i] += '<div class="float_l wares_main" title="'+r.data.product_rows[i]['name']+' &nbsp;&nbsp;颜色：'+r.data.product_rows[i]['color']+'">';
						}else{
							info[i] += '<div class="float_l wares_main" title="'+r.data.product_rows[i]['name']+'&nbsp;&nbsp;颜色：'+r.data.product_rows[i]['color']+'&nbsp;&nbsp;尺码：'+r.data.product_rows[i]['size']+'">';
						}

                        info[i] += '<span class="headerCpro_name "><a href="/product/detail/id/'+r.data.product_rows[i]['id']+'/saleid/'+r.data.product_rows[i]['spu']+'.html" target="_blank">'+r.data.product_rows[i]['brand_ename'] +'&nbsp;'+r.data.product_rows[i]['brand_name']+ '</a></span>';
                        info[i] += '<span class="c_gray_2 wares">'+r.data.product_rows[i]['name'] + '</span><div class="ws_tip clearfix">';
                        info[i] += '</div><span class="c_gray_3">￥'+ r.data.product_rows[i]['activity_price'] + '</span>　<span class="c_gray_2">╳'+r.data.product_rows[i]['quantity'] + '</span><div class="clearfix">';
                        // 全球购处理
                        if (r.data.product_rows[i]['is_cbs'] == 1){
                            info[i] += '<div class="cp_global float_l"></div>';
                        }
                        if (r.data.product_rows[i]['type'] == 2){
                            info[i] += '<div class="cp_zeng float_l"></div>';
                        }
                        if (r.data.product_rows[i]['type'] == 3){
                            info[i] += '<div class="cp_jian float_l"></div>';
                        }
                        if (r.data.product_rows[i]['type'] == 5){
                            info[i] += '<div class="cp_give float_l"></div>';
                        }
                        if (r.data.product_rows[i]['type'] == 1 || r.data.product_rows[i]['type'] == 2 || r.data.product_rows[i]['type'] == 3 || r.data.product_rows[i]['type'] == 4){
                            info[i] += '<div class="cp_act float_l"></div>';
                        }
                        info[i] += '</div></div><div class="headerCpro_del" onclick="delheadpro(this,'+r.data.product_rows[i]['total_price'] + ','+r.data.product_rows[i]['activity_id'] +','+ r.data.product_rows[i]['type']+','+ r.data.product_rows[i]['id']+');">╳</div></div>';
					}
						total_price += Number(r.data.product_rows[i]['total_price']);
                }
                $('.msgnum').html(num);
                $('.headerCart_total_price').html(total_price + ".00");
                $('.headerCpro').html(info);
                $('.headerCproN').hide();
                $('.headerCart_m_info_show').show();
            }else {
                $('.msgnum').html(0);
                $('.headerCart_m_info_show').hide();
                $('.headerCproN').show();
			}
        }
//            console.log(r.data);
    })
}

//获取指定名称的cookie的值
function getCookie(name){
	var objName = name;
	var arrStr = document.cookie.split("; ");
	for(var i = 0;i < arrStr.length;i ++){
		var temp = arrStr[i].split("=");
		if(temp[0] == objName) return unescape(temp[1]);
	}
}

//金额格式化
function fmoney(s, n)
{
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    t = "";
    for(i = 0; i < l.length; i ++ )
    {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

//删除右上角购物袋商品
function delheadpro(obj,price,activity_id,type,sku_id){
    //var confirmmsg = confirm("您确定要把此商品移除购物袋嘛?");
	//if(confirmmsg == true){
		var thisobj = $(obj);
	//	// var total_price = $('.c_purple').html();
	//	// var num = $('.msgnum').html();
	//	// total_price -= Number(price);
	//	// num = Number(num) - 1;
	//	// $('.c_purple').html(total_price);
	//	// $('.msgnum').html(num);
		$.post('/member/cart/del' ,{activity_id:activity_id,sku_id:sku_id,type:type} , function (res) {
			res = $.isPlainObject(res)?res:$.parseJSON(res);
			if (!res.status) {
				alert(res.info);
				return false;
			}
			if (res.status){
				cart();
				thisobj.parents(".headerCpro_m").remove();
			}
		})
	//	cart();
	//	thisobj.parents(".headerCpro_m").remove();
	//}
	//var confirmmsg;
	//boxShow('bc_cart_header');
	//$('#bc_cart_header .ab_btn01').click(function(){
	//	confirmmsg = true;
		//if(confirmmsg == true){
		//	var thisobj = $(obj);
			// var total_price = $('.c_purple').html();
			// var num = $('.msgnum').html();
			// total_price -= Number(price);
			// num = Number(num) - 1;
			// $('.c_purple').html(total_price);
			// $('.msgnum').html(num);
			//$.post('/member/cart/del' ,{activity_id:activity_id,sku_id:sku_id,type:type} , function (res) {
			//	if (!res.status) {
			//		showMsg('showMsg00','温馨提示',res.info);
			//		return false;
			//	}
			//	if (res.status){
             //       cart();
             //       thisobj.parents(".headerCpro_m").remove();
			//	}
			//});
			// cart();
		//}
	//})
}

//在线咨询
function backTop(){
	$("body,html").animate({scrollTop:0},200)
	return false;
}

//公共tab切换
jQuery.jqtab = function(tabtit,tab_conbox,shijian){
	$(tab_conbox).find(".tab_conbox_m").hide();
	$(tab_conbox).find(".tab_conbox_m:first").show();
	$(tabtit).find("li:first").addClass("thistab").show();

	$(tabtit).find("li").on(shijian,function(){
		$(this).addClass("thistab").siblings("li").removeClass("thistab");
		var activeindex = $(tabtit).find("li").index(this);
		$(tab_conbox).children().eq(activeindex).show().siblings().hide();
		return false;
	});
};

//公用tip
function tipsShow(b){
	var $tip=$('<div id="tip"><div class="t_box"><div class="tip_msg">'+ b +'<s><i></i></s></div></div></div>');
    $('body').append($tip);
    $('#tip').show('fast');
	$('.tip').mouseout(function(){
	  $('#tip').remove();
	}).mousemove(function(e){
	  $('#tip').css({"top":(e.pageY-20)+"px","left":(e.pageX+30)+"px"})
	}).mousedown(function(){
	  $('#tip').remove();
	})
}

//公用弹窗
function boxShow(boxID){
	var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    var relLeft = ($(window).width() - $("#" + boxID).width())/2;
    var relTop = ($(window).height() - $("#" + boxID).height())/2;
    $(".mask").css({height:maskHeight, width:maskWidth}).show();
	$(".mask_a").css({height:maskHeight, width:maskWidth}).show();
    $("#" + boxID).css({top:relTop + "px", left:relLeft + "px"}).show();
	$(".close_btn").click(function(){
		$(".mask, .ac_box").hide();
	});
};
//窗口变化时公用弹窗位置
window.onresize = function(){
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();
	var relLeft = ($(window).width() - $('.ac_box:visible').width())/2;
	var relTop = ($(window).height() - $('.ac_box:visible').height())/2;
	$(".mask").css({height:maskHeight, width:maskWidth});
	$(".mask_a").css({height:maskHeight, width:maskWidth});
	$('.ac_box').css({top:relTop + "px", left:relLeft + "px"});
}

//公用提示框
function showMsg(boxID,boxTitle,boxMsg){
	var $showMsg = $('<div id="'+ boxID +'" class="ac_box ws_ac_box ac_medium"><div class="ac_box_tit"><span>'+ boxTitle +'</span><div class="close_btn ws_close_btn">╳</div></div><div class="ac_box_msg">'+ boxMsg +'</div><div class="ac_btn_box"><a class="ab_btn01 close_btn ws_close_btn" href="javascript:void(0);">确认</a></div></div>')
	$("body").append($showMsg);
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    var relLeft = ($(window).width() - $("#" + boxID).width())/2;
    var relTop = ($(window).height() - $("#" + boxID).height())/2;
    $(".mask").css({height:maskHeight, width:maskWidth}).show();
    $("#" + boxID).css({top:relTop + 'px', left:$(window).scrollLeft() + relLeft + 'px'}).show();
	$(document).on("click",".ws_close_btn, .mask",function(){
		$('.ws_ac_box').remove();
		$(".mask").hide();
	});
}


//异步获取JS模块
function modules(jsModules,fn,jsRoot) {
	var jsRoot = !jsRoot ? app+'/static/js/modules/': jsRoot;
	if($.isArray(jsModules)) {
		var mod = jsModules.shift();
		mod = mod.indexOf('.js') >0? mod : mod+'.js';
		$.getScript(jsRoot+mod,function () {
			if(jsModules.length>0) modules(jsModules,fn,jsRoot); else if($.isFunction(fn)) fn();
		});
	}
	else {
		jsModules = jsModules.indexOf('.js') >0? jsModules : jsModules+'.js';
		$.getScript(jsRoot+jsModules,fn);
	}
}

//获取表单值
$.fn.getFormData = function(notFilter) {
	"use strict";
	var obj = this;
	var data = {};
	obj.find(':input').each(function() {
		var tmp = $(this).val();
		var key = $(this).attr('name');
		if(!!notFilter || (tmp!='' && tmp!=null)) { //默认过滤空值
			data[key]= tmp;
		}
	});
	return data;
}

$.postJ = function(url,data,fn,hideMsg) {
	"use strict";
	$.post(url,data,function(res) {
		if(!res) {
			showMsg('NetErrorMsg','','网络延迟，请重试');
			return false;
		}
		else {
			var json = $.isPlainObject(res)?res:$.parseJSON(res);
			if(!!json.info && !hideMsg) { showMsg('PostJMsg','',json.info);  }
			if(typeof fn=='function') fn(json);
		}
	});
}

//异步渲染页面
$.postH = function(url,data,fn) {
	"use strict";
	$.post(url,data,function(res) {
		if(!res) {
			showMsg('NetErrorMsg','','网络延迟，请重试');
			return false;
		}
		else if(typeof fn=='function') fn(res);
	});
}

//JSONP
var MODULE_URLS = null;
$.jsonP = function (module,url,data,fn) {
	"use strict";
	var runJsonp = function(module,url,data,fn) {
		var fullUrl = (!module?'':MODULE_URLS[module])+url;
		$.ajax({ type : "post", url : fullUrl, dataType : "jsonp", data: data,
			jsonp: "jpcallback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
			//jsonpCallback:"jpcallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
			success : function(json){        if(typeof fn=='function') fn(json);        },
			error:function(){   showMsg('NetErrorMsg','','网络延迟，请重试');     }
		});
	}
	if(!MODULE_URLS) {
		$.postJ(app+'/home/index/mdurls',{},function (json) {
			if(!!json.status) {
				MODULE_URLS = json.data;
				runJsonp(module,url,data,fn);
			}
		});
	}
	else runJsonp(module,url,data,fn);
}

//获取商品详情url
function getProUrl(spuId,skuId){
	return app+"/product/detail/id/"+skuId+"/saleid/"+spuId+".html";
}

//图片url可指定尺寸
function imageUrl(url,size) {
	var ext = url.substr(url.lastIndexOf('.'));
	if(!url.match(/^(https?:\/\/[^\/]+)?\/u\//)) return url;
	else if(!size) return url.substr(0,url.lastIndexOf('.')).replace(/-\d+x\d+$/,'')+ext;
	else if(!size.match(/^\d+[x*]\d+$/)) return url;
	else {
		url.substr(0,url.lastIndexOf('.')).replace(/-\d+x\d+$/,'')+ext;
		var tmp_url = url.substr(0,url.lastIndexOf('.')).replace(/-\d+x\d+$/,'-');
		if(!tmp_url.match(/-$/)) tmp_url = tmp_url + '-';
		return tmp_url+size.replace('*','x')+ext;
	}
}


var fileUploadUrl = new Object();
//当前时间的时间戳
function nowTime() {
	return parseInt(new Date().getTime()/1000);
}
//获取文件上传的url
function getFileUploadUrl(ops,fn) {
	if(!ops.uploadPath) return false;
	if(!fileUploadUrl[ops.uploadPath]) {
		$.postJ(app+'/Home/tools/getStoreUrls',{uploadPath:ops.uploadPath,limitWidth:ops.limitWidth,limitHeight:ops.limitHeight},function(urls){
			fileUploadUrl[ops.uploadPath] = [urls,nowTime()];
			if($.isFunction(fn)) fn(urls);
		});
	}
	else {
		if(nowTime()-fileUploadUrl[ops.uploadPath][1]>1200) { //20min
			$.postJ(app+'/Home/tools/getStoreUrls',{uploadPath:ops.uploadPath,limitWidth:ops.limitWidth,limitHeight:ops.limitHeight},function(urls){
				fileUploadUrl[ops.uploadPath] = [urls,nowTime()];
				if($.isFunction(fn)) fn(urls);
			});
		}
		else { if($.isFunction(fn)) fn(fileUploadUrl[ops.uploadPath][0]); }
	}
}

$.fn.renderFileUpload = function(options,fn) { //渲染上传按钮插件
	"use strict";
	var inputObjs = this;
	In.ready('McWebUploader',function() {
		inputObjs.McWebUploader(options,fn);
	});
}
//打开美西企业QQ
function chatQQOnclick(){
	var chatUrl = '';
	if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
		chatUrl = 'http://wpa.qq.com/msgrd?v=3&uin=800019121&site=qq&menu=yes';
	}else{
		chatUrl = 'http://b.qq.com/webc.htm?new=0&sid=800019121&o=www.meici.com&q=7';
	}
	window.open(chatUrl, '_blank', 'height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');
}

//搜索
function search() {
	var k = $.trim($('#sch_kwd').val());
	if(!k) {
		return false;
	}
	_hmt.push(['_trackEvent', '公共头', '点击', '搜索']);
	location.href = app+'/search/index/k/'+encodeURI(k);
}

$(function(){
	if(window.PIE){
		var objs = $(".proList li");
		objs.each(function(){
			PIE.attach(this);
		});
	}
	if($("textarea").attr('placeholder')){
		$("textarea").placeholder();
	}
	if($('input').attr('placeholder')){
		$("input").placeholder();
	}
	var timoutid;
	//头部导航二级菜单
	$(".header_nav_m li").mouseenter(function(){
		var thisIndex = $(this).index();
		var $this = $(this);
		timoutid = setTimeout(function(){
			$this.siblings("li").children("em").css({"display":"none"});
			$this.children("em").css({"display":"block"});
			$(".header_nav_n .header_nav_sel").eq(thisIndex).show().siblings().hide();
		},300);
	});
	$(".header_nav").mouseleave(function(){
		clearTimeout(timoutid);
		$(".header_nav_m li em").css({"display":"none"});
		$(".header_nav_n .header_nav_sel").hide();
	});

	//会员中心会员等级介绍
	$(".account_user_level").hover(function(){
		$(".user_level_explain").show();
	},function(){
		$(".user_level_explain").hide();
	});
	$(".icon_service li").hover(function(){
		$(this).siblings().children(".icon_service_con").hide();
		$(this).children(".icon_service_con").show();
	},function(){
		$(this).children(".icon_service_con").hide();
	});

	//在线咨询超出范围显示返回顶部
	/*$(window).scroll(function() {
		if($(this).scrollTop() > 200) {
			$(".consult").fadeIn(300);
		} else {
			$(".consult").fadeOut(300);
		}
	});*/
	//在线咨询APP下载提示
	$(".consultApp").hover(function(){
		$(this).children(".consult_app_m").fadeIn(100);
	},function(){
		$(this).children(".consult_app_m").fadeOut(100);
	});


    //判断浏览器如若为https则改为http
    var targetProtocol = "http:";
    if (window.location.protocol != targetProtocol){
        window.location.href = targetProtocol + window.location.href.substring(window.location.protocol.length);
    }

});