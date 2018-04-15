$(function () {
    $("#cart_like").jCarouselLite({
        visible: 4,
        btnNext: ".cart_next",
        btnPrev: ".cart_prev",
        auto: null,
        speed: 800,
        scroll: 4,
        start: 0
    });
    $("#cart_browse").jCarouselLite({
        visible: 4,
        btnNext: ".cart_next",
        btnPrev: ".cart_prev",
        auto: null,
        speed: 800,
        scroll: 4,
        start: 0
    });

	var giftLength = $(".choose_Gifts").find("li").length;
	if(giftLength < 4){
		$(".gift_next, .gift_prev").hide();
	}else{
		$("#choose_Gifts").jCarouselLite({
			visible: 4,
			btnNext: ".gift_next",
			btnPrev: ".gift_prev",
			auto: null,
			speed: 800,
			scroll: 4,
			start: 0
		});
	}
});

/**
 * 加入购物袋
 */
function member_cart_add(sku_id) {
    var sku_id = sku_id || $('#skuId').val();
    if (!sku_id) {
        showMsg('showMsg01','温馨提示','请选择尺码');
        return false;
    }
    $.post('/member/cart/add', {'sku_id': sku_id}, function (res) {
        if (!res) {
            showMsg('showMsg01','温馨提示','网络延迟，请重试');
            return false;
        } else {
            var json = $.isPlainObject(res) ? res : $.parseJSON(res);
            if (!json.status) {
                showMsg('showMsg01','温馨提示',json.info);
                return false;
            }
            //showMsg('showMsg01','温馨提示','商品已加入购物袋');
			$(".headerCart_m").fadeIn(200);
			$("body,html").animate({scrollTop:0},200);
            cart();
            return false;
        }
    });
}

/**
 * 立即购买
 */
function member_cart_buyone() {
    var sku_id = $('#skuId').val();
    if (!sku_id) {
        showMsg('showMsg02','温馨提示','请选择尺码');
        return false;
    }
    $.post('/member/cart/buyone', {'sku_id': sku_id}, function (res) {
        if (!res) {
            showMsg('showMsg02','温馨提示','网络延迟，请重试');
            return false;
        } else {
            console.info(res);
            if(!$.isPlainObject(res)){
                var reg = /^<script.*?>location\.href="(.*?)";<\/script>$/ig;
                if (res.match('script') && res.match('dobind')) {
                    location.href="/Member/Index/bind?dobind=1&forward_url=" + location.href;
                } else if(res.match(reg)){
                    boxShow("bc01");
                    return false;
                }
            }
            var json = $.isPlainObject(res) ? res : $.parseJSON(res);
            if (!json.status) {
                showMsg('showMsg02','温馨提示',json.info);
                return false;
            }
            window.location.href = '/member/order';
        }
    });
}