/**
 * Created by peak.cha on 2016-09-21.
 */

var member_index = {};

//验证码
member_index.fleshVerify = function (obj) {
    // member_index.checkaccount();
    // var timenow = new Date().getTime();
    var random = Math.random();
    obj.attr('src','/member/index/code/'+random);
}

//登陆条
member_index.loginBar = function () {
    $.postH('/member/index/loginbar',{},function (res) {
        $('#header .login_bar .container').html(res);
    });
}

//注册对话框
member_index.regWin = function () {

}

member_index.isLogin = function (successFn,failFn) {
    $.postH('/member/index/islogin',{},function (res) {
        if (res== 1) { if($.isFunction(successFn)) successFn(); }else { if($.isFunction(failFn)) failFn(); }
    });
}

//登陆对话框
member_index.loginWin = function (fn) {
    modules(['jquery.form','validate'],function () {
        member_index.isLogin('',function () {
            dialogWin({title:'会员登录',url:'/member/index/loginwin',width:440,closeBtn:false,
                btns:[
                    {name:'登录',style:'btn-primary mgR8',callback:function(win) { member_index.loginwinSubmit(win,fn); }},
                    {name:'注册',style:'btn-default mgL8',callback:function(win) { win.remove(); member_index.regWin(); }}
                ]
            },function (win) {
                win.find('form').initValidate(function () { member_index.loginwinSubmit(win,fn); });
                win.find(':input[name=account]').focus();
            });
        });
    },'/static/js/lib/');
}

//登录对话框提交表单
member_index.loginwinSubmit = function (win,fn) {
    var account = $('input[name=account]').val();
    var password = $('input[name=password]').val();
    // var verify = $('input[name=verify]').val();
    if (!account.match(/\S+/g) && !password.match(/\S+/g)){
        $('.men_err_msg').html('<font id="logincheckmsg" color="red">请输入用户名</font>&nbsp;&nbsp;&nbsp;');
        return false;
    }
    if (!account.match(/\S+/g)){
        $('.men_err_msg').html('<font id="logincheckmsg" color="red">请输入用户名</font>&nbsp;&nbsp;&nbsp;');
        return false;
    }
    if (!password.match(/\S+/g)){
        $('.men_err_msg').html('<font id="logincheckmsg" color="red">请输入密码</font>&nbsp;&nbsp;&nbsp;');
        return false;
    }
    $('#logincheckmsg').remove();
    // member_index.checkaccount();
    // member_index.checkpassword();
    // member_index.checkverify();
    win.find('form').validate(function(){
        win.find('form').ajaxSubmit({ //提交
            url:'/member/index/checkLogin',
            data:{dosubmit:1},
            success: function (r) {
                r = $.isPlainObject(r)?r:$.parseJSON(r);
                if (!!r.status) {
                    if($.isFunction(fn)){ fn();}; win.find('form').resetForm();
                    $('#msg').remove();
                    member_index.loginBar();
                }
                else {
					if(r.info == "“密码”参数值必须是由6~32个字母、数字、标点符[ ~!@#$%^&*_- ]号组成的字符串！"){
						r.info = "用户名或密码错误";
					}else if(r.info == "该会员密码不正确！"){
						r.info = "用户名或密码错误";
					}else if(r.info == "“用户账号”参数值必须是手机号或邮箱格式！"){
						r.info = "用户名必须为邮箱或手机号";
					}

                    $('.men_err_msg').html('<font id="msg" color="red">'+r.info+'</font>&nbsp;&nbsp;&nbsp;');
                    member_index.fleshVerify(win.find('.verifyImg'));
                    if (r.data > 5){
                        $('#login_verify').show();
                    }
                }
            }
        });
    });
}

member_index.toOrderPage = function () {
    member_index.isLogin(
        function(){ location.href='/member/center/index.html';},
        function(){ member_index.loginWin(function () { location.href='/member/center/index.html'; }); }
    );
}

member_index.registerSubmit = function (win) {
    var account = $('input[name=account]').val();
    var password = $('input[name=password]').val();
    win.find('form').validate(function(){
        var data = win.find('form').getFormData();
        if(data.password!=data.password2) {
            // msgShow('密码不一致！',0);
            $('.men_err_msg').html('<font id="passworderror" color="red">两次输入的密码不一致</font>&nbsp;&nbsp;&nbsp;');
            return false;
        }
        $('#passworderror').remove();
        win.find('form').ajaxSubmit({ //提交
            url:'/member/index/register',
            data:{dosubmit:1},
            success: function (r) {
                r = $.isPlainObject(r)?r:$.parseJSON(r);
                // new $.zui.Messager(r.info, { type:!r.status?'warning':'success', placement: 'center' }).show();
                if(!!r.status) {
                    $('#msg').remove();
                    win.find('form').resetForm();
                    $.post('/member/index/checkLogin',{account:account,password:password},function(arr){
                        var arr = $.isPlainObject(arr)?arr:$.parseJSON(arr);
                        if(!arr.status) {
                            location.href='/member/index/login.html?forward_url=/Member/center/index';
                        }else{
                            location.href='/member/index/index';
                        }
                    })
                }else{
					if(r.info == "“请输入正确的手机号码”不能为空"){
						r.info = "请输入手机号";
					}else if(r.info == "“请输入正确的手机号码”参数值必须是手机号或邮箱格式"){
						r.info = "请输入手机号";
						r.info = "请输入手机号";
					}else if(r.info == "“密码”不能为空"){
						r.info = "两次输入的密码不一致";
					}else if(r.info == "“密码”参数值必须是由6~32个字母、数字、标点符[ ~!@#$%^&*_- ]号组成的字符串"){
                        r.info = "密码必须是由6~32个字母、数字组成";
                    }

                    $('.men_err_msg').html('<font id="msg" color="red">'+r.info+'</font>&nbsp;&nbsp;&nbsp;');
                }
            }
        });
    });
}

//验证用户名
member_index.checkaccount = function () {
    var account = $('input[name=account]').val();
    if (!account.match(/\S+/g)){
        $('.men_err_msg').html('<font id="accountemptymsg" color="red">请输入用户名</font>&nbsp;&nbsp;&nbsp;');
        return false;
    }else {
        if (!account.match(/^1[34578][0-9]{9}$/) && !account.match(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)){
            $('.men_err_msg').html('<font id="accountphoneemailmsg" color="red">用户名必须为邮箱或手机号</font>&nbsp;&nbsp;&nbsp;');
            return false;
        }else{
            $('#accountphoneemailmsg').remove();
            $.post('/member/index/checkUser',{account:account},function(r){
                    var r = $.isPlainObject(r)?r:$.parseJSON(r);
                    if(!r.status) {
                        $('.men_err_msg').html('<font id="checkusermsg" color="red">'+r.msg+'</font>&nbsp;&nbsp;&nbsp;');
                        return false;
                    }else{
                        $('#checkusermsg').remove();
                    }
            })
        }
        $('#checkusermsg').remove();
        $('#accountemptymsg').remove();
    }
    return true;
}

//注册验证用户名
member_index.registercheckaccount = function () {
    var account = $('input[name=account]').val();
    if (!account.match(/\S+/g)){
        $('.men_err_msg').html('<font id="accountemptymsg" color="red">请输入常用手机号</font>&nbsp;&nbsp;&nbsp;');
        return false;
    }else {
        if (!account.match(/^1[34578][0-9]{9}$/) && !account.match(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)){
            $('.men_err_msg').html('<font id="accountphoneemailmsg" color="red">请输入正确的手机号码</font>&nbsp;&nbsp;&nbsp;');
            return false;
        }else{
            $('#accountphoneemailmsg').remove();
            $.post('/member/index/checkUser',{account:account},function(r){
                var r = $.isPlainObject(r)?r:$.parseJSON(r);
                if(!r.status) {
                    $('#checkusermsg').remove();
                }else{
                    $('.men_err_msg').html('<font id="checkusermsg" color="red">此用户已存在</font>&nbsp;&nbsp;&nbsp;');
                    return false;
                }
            })
        }
        $('#checkusermsg').remove();
        $('#accountemptymsg').remove();
    }
    return true;
}

//验证密码
member_index.checkpassword = function(){
    var password = $('input[name=password]').val();
    if (!password.match(/\S+/g)){
        $('.men_err_msg').html('<font id="passwordemptymsg" color="red">请输入密码</font>&nbsp;&nbsp;&nbsp;');
        return false;
    }else {
        if (!password.match(/^[\w~!@#$%^&*_-]{6,32}$/i)){
            $('.men_err_msg').html('<font id="passwordmsg" color="red">用户名或密码错误</font>&nbsp;&nbsp;&nbsp;');
            return false;
        }else{
            $('#passwordmsg').remove();
        }
        $('#passwordemptymsg').remove();
    }
    return true;
}

//验证验证码
member_index.checkverify = function(){
    var verify = $('input[name=verify]').val();
    if (!verify.match(/\S+/g)){
        $('.men_err_msg').html('<font id="verify" color="red">请输入验证码</font>&nbsp;&nbsp;&nbsp;');
        return false;
    }else {
        $('#verify').remove();
    }
    return true;
}

//忘记密码发送短信验证码
member_index.sendsms = function () {
    var account = $.trim($('input[name=account]').val());
    var verify = $('input[name=verify]').val();
    if(account==''){
        $('.men_err_msg').html('<font id="accountemptymsg" color="red">请填写账号</font>&nbsp;&nbsp;&nbsp;');
        return false;
    }
    $('#accountemptymsg').remove();
    $.post('/member/index/sendsms',{account:account},function(r){
        var r = $.isPlainObject(r)?r:$.parseJSON(r);
        if(!r.status) {
            $('.men_err_msg').html('<font id="msg" color="red">'+r.msg+'</font>&nbsp;&nbsp;&nbsp;');
            return false;
        }else{
            $('#msg').remove();
            run_time(obj);
        }
    })
};

//第三方登录绑定手机号时
member_index.sendcode = function () {
    var account = $.trim($('input[name=account]').val());
    var verify = $.trim($('input[name=verify]').val());
    if (account == '') {
        $('.men_err_msg').html('<font id="accountemptymsg" color="red">请填写账号</font>&nbsp;&nbsp;&nbsp;');
        return false;
    }
    $('#accountemptymsg').remove();
    var ret = true;
    $.ajax({
        async: false,
        type: 'POST',
        url: '/member/index/sendcode',
        data: {account: account, verify: verify},
        success: function (r) {
            var r = $.isPlainObject(r) ? r : $.parseJSON(r);
            if (r.status == 0) {
                $('.men_err_msg').html('<font id="msg" color="red">' + r.msg + '</font>&nbsp;&nbsp;&nbsp;');
                ret = false;
            } else {
                if (r.msg.indexOf('密码') != -1) {
                    $('.password').show();
                    $('input[type=password]').removeAttr('disabled');
                }
                $('#msg').remove();
            }
        }
    });
    return ret;
};

//忘记密码验证短信验证码跳转到设置新密码页面
member_index.checksendsms = function () {
    var account = $.trim($('input[name=account]').val());
    var vcode = $.trim($('input[name=vcode]').val());
    if(account==''){
        $('.men_err_msg').html('<font id="accountemptymsg" color="red">请填写账号</font>&nbsp;&nbsp;&nbsp;');
        return false;
    }
    $('#accountemptymsg').remove();
    $.post('/member/index/checksendsms',{account:account,vcode:vcode},function(r){
        var r = $.isPlainObject(r)?r:$.parseJSON(r);
        if(!r.status) {
            $('.men_err_msg').html('<font id="msg" color="red">'+r.msg+'</font>&nbsp;&nbsp;&nbsp;');
            return false;
        }else{
            $('#msg').remove();
            $.post('/member/index/setNewPassWord',{account:account},function(res){
                document.write(res);
                document.close();
                return true;
            });
            // run_time(obj);
        }
        return true;
    })
};

//验证短信码
member_index.checksms = function(){
    var user_id = $.trim($('#user_id').val());
    var code = $.trim($('#mobileCode').val());
    if(user_id==''){
        showMsg('showMsg1','温馨提示','用户编号异常,请刷新重新登录...');
        return false;
    }
    if(code==''){
        showMsg('showMsg2','温馨提示','请输入验证码');
        return false;
    }
    $.post('/home/index/checksms',{id:user_id,code:code},function(r){
        var r = $.isPlainObject(r)?r:$.parseJSON(r);
        if(!r.status) {
            showMsg('showMsg3','温馨提示',r.info);
        }else{
            window.location.href='/';
        }
    });
}

//检查验证码并跳转至验证身份的页面
member_index.safetyVerification = function () {
    // member_index.checkaccount()
    var account = $('input[name=account]').val();
    var verify  = $('input[name=verify]').val();
    if (!account.match(/\S+/g)){
        $('.men_err_msg').html('<font id="accountemptymsg" color="red">请输入用户名</font>&nbsp;&nbsp;&nbsp;');
        return false;
    }else {
        if (!account.match(/^1[34578][0-9]{9}$/) && !account.match(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)){
            $('.men_err_msg').html('<font id="accountphoneemailmsg" color="red">用户名必须为邮箱或手机号</font>&nbsp;&nbsp;&nbsp;');
            return false;
        }else{
            $('#safetyVerification').remove();
            $.post('/member/index/sendsms',{account:account,verify:verify},function(r){
                var r = $.isPlainObject(r)?r:$.parseJSON(r);
                if(!r.status) {
                    $('.men_err_msg').html('<font id="msg" color="red">'+r.msg+'</font>&nbsp;&nbsp;&nbsp;');
                    return false;
                }else{
                    $('#msg').remove();
                    location.href='/member/index/safetyVerification?account='+account;
                    return true;
                }
            });
        }
        $('#checkusermsg').remove();
        $('#accountemptymsg').remove();
    }
    // var account = $('input[name=account]').val();
}

//设置新密码
member_index.setNewPasswd = function (formObj) {
        formObj.ajaxSubmit({ //提交
            url:'/member/index/setNewPasswd',
            data:{dosubmit:1},
            success: function (r) {
                if(r.info == "“密码”参数值必须是由6~32个字母、数字、标点符[ ~!@#$%^&*_- ]号组成的字符串"){
                    r.info = "密码必须是由6~32个字母、数字组成";
                }
                if(r.info == "“确认密码”参数值必须是由6~32个字母、数字、标点符[ ~!@#$%^&*_- ]号组成的字符串  "){
                    r.info = "确认密码必须是由6~32个字母、数字组成";
                }
                $('.men_err_msg').html('<font id="info" color="red">'+r.info+'</font>&nbsp;&nbsp;&nbsp;');
                // showMsg('NewPassword','',r.info);
                if(!!r.status) {
                    $('#info').remove();
                    location.href='/member/index/login.html?forward_url=/Member/center/index';
                }
            }
        });
}

member_index.bindSubmit = function (win)
{
    win.find('form').validate(function ()
    {
        var data = win.find('form').getFormData();
        win.find('form').ajaxSubmit({ //提交
            url: '/member/index/bind',
            data: {dosubmit: 1},
            success: function (r)
            {
                r = $.isPlainObject(r) ? r : $.parseJSON(r);
                if (!!r.status) {
                    $('#msg').remove();
                    win.find('form').resetForm();
                    if ($('#forward').val() != '') {
                        location.href = $('#forward').val();
                    } else {
                        location.href = '/member/index/index';
                    }
                } else {
                    if (r.info == "“请输入正确的手机号码”不能为空") {
                        r.info = "请输入手机号";
                    } else if (r.info == "“请输入正确的手机号码”参数值必须是手机号或邮箱格式") {
                        r.info = "请输入手机号";
                        r.info = "请输入手机号";
                    }

                    $('.men_err_msg').html('<font id="msg" color="red">' + r.info + '</font>&nbsp;&nbsp;&nbsp;');
                }
            }
        });
    });
}


//解绑银行卡
member_index.unwrap = function(id,sign_sn){
    if(id == '' || sign_sn == ''){
        showMsg('showMsg','温馨提示','卡号编号异常,请刷新重新登录...');
        return false;
    }
    $.post('/member/center/unwrap',{id:id,sign_sn:sign_sn},function(r){
        if(!r.status) {
            showMsg('showMsg','温馨提示',r.info);
        }else{
            window.location.reload();
        }
    });
}

//注册发送短信验证码
member_index.registerSendsms = function () {
    var account = $.trim($('input[name=account]').val());
    var verify = $('input[name=verify]').val();
    if(account==''){
        $('.men_err_msg').html('<font id="accountemptymsg" color="red">请填写账号</font>&nbsp;&nbsp;&nbsp;');
        return false;
    }
    $('#accountemptymsg').remove();
    $.post('/member/index/sendsms',{account:account,verify:verify},function(r){
        var r = $.isPlainObject(r)?r:$.parseJSON(r);
        if(!r.status) {
            $('.men_err_msg').html('<font id="msg" color="red">'+r.msg+'</font>&nbsp;&nbsp;&nbsp;');
            return false;
        }else{
            $('#checkusermsg').remove();
            $(".register_ver .acclink").hide();
            $(".ver_again").show();
            $('.ver_time').text('60');
            countDown();
            $('#msg').remove();
            run_time(obj);
        }
    })
};

// 倒计时
function countDown(){
    var num = Number($('.ver_time').html()) - 1;
    if(num > 0){
        var str = '';
        str += ' ' + num + ' ';
        $('.ver_time').html(str);
        num--;
        setTimeout(function(){
            var num1 = Number($('.ver_time').html());
            if(num < num1){
                countDown();
            }
        }, 1000);
    }
    else {
        $(".ver_again").hide();
        $(".register_ver").find(".acclink").html("重新发送").show();
    }
}
