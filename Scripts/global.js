/*常量  BEGIN*/
var TRADER_LIST_HANDLE_URL = "/Traders/Traderpage";
var TRADER_INFO_HANDLE_URL = "";/*加载交易员基本信息*/
var USER_LOGIN_CALL_BACK = null;
var USER_LOGIN_CALL_BACK_PARAM = null;
var USER_LOGIN_CALL_BACK_ALLOW_CANCEL = null;
var Page_Common_Ajax_Error = "请求失败，请刷新页面后重试。";
var USER_ASSOCIATE_OBJECT = null;
var USER_ASSOCIATE_URL = "/Report/Member/GetMemberAssociate";
var USER_GETASSOCIATE_URL = "/Social/Attention/GetAttAndFansCount";
var REQUIRED_USER_ASSOCIATE = false;
/*常量  END*/


function IsIntNumber(val) {
    var isNum = /^[0-9]+$/;
    return isNum.test(val);
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

// on document ready;
$(document).ready(function () {

    //运营推广域名处理
    var fromAds = document.referrer;
    var thisAds = window.location.href;
    if (thisAds.indexOf('www.vipfollowme.com') > -1) {
        if (fromAds.indexOf('www.baidu.com') == -1) {
            var toAds = thisAds.replace('www.vipfollowme.com', 'www.followme.com')
            window.location.href = toAds;
        }
    }


    if ($(".nui-scroll").size() > 0)
        var nicesx = $(".nui-scroll").niceScroll({ touchbehavior: false, cursorcolor: "#a3a6af", cursoropacitymax: 0.6, cursorwidth: 8, horizrailenabled: false });
    var sendUrl = '';
    getLatestMessage();//消息提醒
    screening_click();
    initValidateCode();
    //initLogin();
    loadDateTimePicker();
    setInterval(getLatestMessage, 5000);
    exChange();//tab切换
    tableSort();//表格排序
    commonSort();//排序
    exshowHide();
    //首页我的账户下拉菜单
    $(".inuser_xiala").each(function () {
        $(this).mouseover(showUserMenu($(this), true)).mouseout(showUserMenu($(this), false));
    })

    $("#login_title").mouseover(function () {
        $(".inuser_xiala").each(function () {
            if ($(this).attr("index") == USER_LOGIN_USER_TYPE) {
                showUserMenu($(this), true);
            }
        });
    }).mouseout(function () {
        $(".inuser_xiala").each(function () {
            if ($(this).attr("index") == USER_LOGIN_USER_TYPE) {
                showUserMenu($(this), false);
            }
        });
    }
    );

    //微博框默认值；
    //$("textarea[class='input-box']").attr('placeholder', '提示：平台禁止发布私人QQ、电话等联系方式；禁止发布广告、谣言等敏感信息，否则将屏蔽或禁用账户。');

    //$("input,textarea").placeholder();

    //将数字格式化为千分号
    formatMoneyNum();

    //去除文本框两端的多余空格
    $("input[type='text']").blur(
    function () {
        var val = $(this).val();
        if (val) {
            $(this).val(val.replace(/(^\s*)|(\s*$)/g, ""));
        }
    }
   );
    //如果定义了autoPopLoginWindow=true 则自动弹出登录
    //if (autoPopLoginWindow != undefined && autoPopLoginWindow) {
    //    $("#box_login").show();
    //};

    //新闻类文章页面选择大字号
    $("#largeSize").click(function () {
        $(".page_wen").addClass("font_wen_big");
        $("#largeSize").addClass("dq");
        $("#smallSize").removeClass("dq");
    });
    //新闻类文章页面选择小字号
    $("#smallSize").click(function () {
        $(".page_wen").removeClass("font_wen_big");
        $("#largeSize").removeClass("dq");
        $("#smallSize").addClass("dq");
    });

    //首页用户评论
    var firstFeeds = $("#user_commnts_list span").first();
    if (firstFeeds != 'undefined') {
        firstFeeds.addClass("first");
    }
    //加载用户关联数据
    getUserAssociate();

    //头部导航搜索点击拉开输入框
    $("#search-ico").click(function () {
        if ($("#search_form").find('input').val() === '') {
            $(this).parent().css({ backgroundColor: 'white' });
            $(this).parent().animate({ width: '140px' }, 500).find('input').focus();
            $("#search-ico").blur();
        } else {
            $("#search_form").submit();
        }
    });
    var is_flag = true;
    var is_flag_a = true;
    //var is_flag_b=true;
    $("#i-picture-box,div[id*='i-user-box'],#i-picture-box-send").live('click', function (e) {
        //if ($(e.target).hasClass('i-pic-close')) {
        //    return;
        //}
        e.stopPropagation();
    });
    $("#ipclose").click(function (e) {
        $("#i-picture-box").hide();
        is_flag = true;
    });
    $("#ipcloseSend").click(function (e) {
        $("#i-picture-box-send").hide();
        is_flag = true;
    });
    $(".i-close").live('click', function (e) {
        $("div[id*='i-user-box']").hide();
        is_flag_a = true;
    });
    $(".for-close").live('click', function () {
        $("#forwar-box").fadeOut();
    });
    $(".send-close").live('click', function () {
        $("#send-box").fadeOut();
    });
    $(document).click(function (e) {

        var target = $(e.target);
        var targetId = $(e.target).attr('id');
        if (targetId === 'search-ico' || targetId === 'search-input') {
            return;
        }
        $("#search_form").find('input').val('');
        $("#search-ico").parent().animate({ width: '27px' }, 500);
        setTimeout(function () {
            $("#search-ico").parent().css({ backgroundColor: '' });
        }, 400);
        $("#i-picture-box").hide();
        $("#i-picture-box-send").hide();
        $("div[id*='i-user-box']").hide();
        if (target.parent().hasClass('i-picture') && is_flag) {
            target.parent().parent().next().show();
            is_flag = false;
        } else {
            is_flag = true;
        }
        if (target.parent().hasClass('i-user') && is_flag_a) {
            target.parent().children(1).show();
            is_flag_a = false;
        } else {
            is_flag_a = true;
        }

    });
    $(".head-fl >ul >li").mouseover(function () {
        $(this).find('i').css('background-position', '0px -20px');
    });
    $(".head-fl >ul >li").mouseout(function () {
        $(this).find('i').css('background-position', '0px -15px');
    });
    $(".guide-li").mouseover(function () {
        $($(this).find('i')[0]).css('background-position', '-12px -12px');
        $($(this).find('i')[1]).css('background-position', '-25px -4px');
    });
    $(".guide-li").mouseout(function () {
        $($(this).find('i')[0]).css('background-position', '-12px 0px');
        $($(this).find('i')[1]).css('background-position', '-25px 0px');
    });
    $(".user-set >ul >li").mouseover(function () {
        $(this).find('.i_down').css('background-position', '-25px -4px');
    });
    $(".user-set >ul >li").mouseout(function () {
        $(this).find('.i_down').css('background-position', '-25px 0px');
    });
    //退出菜单
    $("#user_img").hover(function () {
        $("#exit_box").show();
    });
    $("#user_img").mouseleave(function () {
        $("#exit_box").hide();
    });

    $("#login-wide-close").click(function () {
        $("#login-box").hide();
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 500) {
            $("#back-to-top").fadeIn(1500);
        }
        else {
            $("#back-to-top").fadeOut(1500);
        }
    });

    //当点击跳转链接后，回到页面顶部位置

    $("#back-to-top").click(function () {
        $('body,html').animate({ scrollTop: 0 }, 200);
        return false;
    });

    if ($(".icheck_box").length > 0) {
        //checkbox转型
        $(".icheck_box").iCheck({
            checkboxClass: 'icheckbox_square-blue',
            increaseArea: '20%',
            activeClass: 'none'
        });
    }

    //多账户下拉
    /**** 
    $('.js_account_pull').live('mouseover', function () {
        $(this).parents('li,.ul-bj').siblings().find('.js_account_pull').removeClass('hover');
        $(this).addClass('hover');
    })
    $('.js_account_pull').live('mouseout', function () {
        $(this).removeClass('hover');
    })
   ***/
    var ps_timer = account_pull_wrap = pslitStr = "";
    var oTx = oTy = 0;
    $('.js_account_pull').live('mouseover', function (e) {
        if ($(this).find('.pull_listbox').length) {
            pslitStr = $(this).find('.pull_listbox').prop('outerHTML');
            clearTimeout(ps_timer);
            oTx = $(this).offset().left - 60 + "px";
            oTy = $(this).offset().top + 5 + "px";
            account_pull_wrap = '<div class="account_pull_wrap" style="left:' + oTx + ';top:' + oTy + '"><div class="account_pull_box"></div></div>';
            if ($('.account_pull_wrap').length) {
                $('.account_pull_wrap').css({ "left": oTx, "top": oTy });
            } else {
                $('body').append(account_pull_wrap);
            }
            $('body .account_pull_wrap .account_pull_box').empty().append(pslitStr);
        } else {
            return false;
        }

    })
    $('.js_account_pull').live('mouseout', function () {
        ps_timer = setTimeout(function () {
            $('body .account_pull_wrap').remove();
        }, 300)
    })
    $('.pull_listbox').live('mouseover', function () {
        clearTimeout(ps_timer);
    })
    $('.pull_listbox').live('mouseout', function () {
        ps_timer = setTimeout(function () {
            $('body .account_pull_wrap').remove();
        }, 300)
    })
    $('.js_account_pull .account_num_bg_box').live('mouseover,mouseout', function (e) {
        stopBubble(e);
    })

    //阻止冒泡
    function stopBubble(e) {
        if (e && e.stopPropagation) {//非IE浏览器 
            e.stopPropagation();
        }
        else {//IE浏览器 
            window.event.cancelBubble = true;
        }
    }

});



function showUserMenu(obj, isShow) {
    if (isShow) {
        $(obj).show();
    }
    else {
        $(obj).hide();
    }
}
//用户登录设置头像
function setUserAvata(user) {
    var avataPath = '';
    if (user.userType == 2) {
        avataPath = DEFAULT_ROOT + "TraderAvata/" + user.id;
    }
    else if (user.userType == 1) {
        avataPath = DEFAULT_ROOT + "CustomerAvata/" + user.id;
    }
    if (avataPath) {
        $("#user_login_avata").attr("src", avataPath);
    }
}

function isPositiveDecimal(str) {
    if (isInteger(str)) {
        return true;
    }
    var re = /^(\d+)[\.]?(\d+)$/;
    if (re.test(str)) {
        if (RegExp.$1 == 0 && RegExp.$2 == 0) {
            return false;
        }
        return true;
    }
    else {
        return false;
    }
};
function formatMoneyNum(obj) {
    var container = obj ? '#' + obj + ' ' : '';
    $(container + ".moneyNum").each(function (i, o) {
        var formated = addThousandsComma($(o)[0].innerText)
        $(o)[0].innerText = formated;
    });
}

//格式化千分位
function addThousandsComma(f) {
    var b = $.trim(f);
    if ("" == b) {
        return b
    }
    var c = "";
    if (b.indexOf("$") >= 0) {
        b = b.substr(1);
        c += "$"
    }
    var sign = ''
    if (b.indexOf("-") >= 0) {
        sign = '-';
    }
    if (isNaN(b)) {
        return b
    }
    var g = b;
    var e = "";
    var a = b.indexOf(".");
    if (a >= 0) {
        g = b.substring(0, a);
        e = b.substr(a)
    }
    var d = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
    return c + g.replace(d, "$1,") + (e ? e : '.00')
}

//去掉千分位
function removeComma(b) {
    var a = b.split(",");
    return a.join("")
}

//验证码初始化
function initValidateCode() {
    var codeUrl = '/Common/GetVCode';
    //if (!$("#img_VCode"))
    //    return;

    //$("#img_VCode").attr("src", codeUrl + "?t=" + new Date().getTime());
    $("#img_VCodeIndex").click(function () {
        $("#img_VCodeIndex").attr("src", codeUrl + "?t=" + new Date().getTime());
    });
    $("#img_VCode").click(function () {
        $("#img_VCode").attr("src", codeUrl + "?t=" + new Date().getTime());
    });
    $("#change_VCode").click(function () {
        $("#img_VCode").attr("src", codeUrl + "?t=" + new Date().getTime());
    });
    $("#img_VCodeEmail").click(function () {
        $("#img_VCodeEmail").attr("src", codeUrl + "?t=" + new Date().getTime());
    });
}



/*在其他页面中请求登录*/
//callback:登录成功回调
//param:回调参数
function requiredLogin(callback, param, allowCancel) {
    if (USER_ID == 0) {
        try {
            clientLogin(callback, param);
        } catch (e) { }
    }
    else {
        callback(param);
    }
}

/*
弹出登录对话框
*/
function clientLogin(callback, param) {
    $("#login-box").show();
    var account = new Account();
    account.init();
    account.stayPage = true;
    account.loginCompleted = function (data) {
        $("#login-box").hide();

        USER_ID = data.LoginInfo.id;
        USER_NickName = data.LoginInfo.nickName;
        if (callback) {
            callback(param);
        }
        //如果昵称为空，跳转到设置昵称页面
        if (USER_NickName === '' || USER_NickName === undefined) {
            window.location.href = "/Account/Register/SetNickName";
        }
        if (window['userLoginStatus'] != undefined) {
            window['userLoginStatus'](USER_ID, USER_NickName);
        }
        //登录之后刷新当前页
        getUserAssociate();
        if (window['onClientLogin'] != undefined) {
            window['onClientLogin'](USER_ID, USER_NickName);
        }

        //客服系统
        try {
            if (NTKF_PARAM != undefined) {
                NTKF_PARAM.uid = data.LoginInfo.id;
                NTKF_PARAM.uname = data.LoginInfo.nickName;
            }
        }
        catch (e) {

        }
    }
}

/*
    修改右上角的登录信息
*/
function userLoginStatus(id, name) {
    /*    $("#login_img").attr('src', '/avata/' + id + '/30/30')
        $("#login_name").text(name);
        $("#curRegist").hide();
        var personshow = $("#personshow").attr('href');
        $("#personshow").attr('href', personshow + '/' + id);
        $("#personshow_a").attr('href', personshow + '/' + id);
        $(".ajaxLogin").show();
        $("#unLogin").hide();*/
    $(".right_pull_list").empty();
    var strHtml = '<div class="login_status"><a href="/userpage/{userid}" class="user_msg link_block">' +
        '<img src="/Avata/{userid}/20/20" width="20" height="20" alt=""><span class="userName">{username}</span></a></div>' + '<div class="pull_list_wrap">' +
        '<ul class="alist">' +
        '<li><a href="/Home"><i class="hear_us_icon us_icon_wdsy"></i>我的首页</a></li>' +
        '<li><a href="/userpage/{userid}"><i class="hear_us_icon us_icon_grzsy"></i>个人展示页</a></li>' +
        '<li><a href="/Account/UserInfo/UserSet"><i class="hear_us_icon us_icon_grsz"></i>个人设置</a></li>' +
        '<li><a href="/logout"><i class="hear_us_icon us_icon_tczh"></i>退出账号</a></li>' +
        '</ul></div>';
    strHtml = strHtml.replace(/{userid}/g, id).replace(/{username}/g, name);
    $(".right_pull_list").append(strHtml);


}

//获取时间戳，避免CACEH
function ticker() {
    return new Date().getTime();
}

/*
公共POST方法
formId:form表单ID
url: POST地址
submitButtonId:提交按钮id
onComplete:完成回调
*/
function postData(formId, url, submitButtonId, onComplete) {
    $("#" + submitButtonId).addClass("btn_dis");
    //$("#" + submitButtonId).attr("disabled", "disabled");
    var text = $("#" + submitButtonId).html();
    $("#" + submitButtonId).html("正在提交...");
    var bindEvent = $("#" + submitButtonId).data("events").click[0];
    $("#" + submitButtonId).unbind("click");
    var data = $("#" + formId).serialize();
    data = data + "&t=" + ticker();
    $.post(url,
                data,
                function (data) {
                    $("#" + submitButtonId).bind("click", bindEvent);
                    setTimeout(function () {
                        $("#" + submitButtonId).removeClass("btn_dis");
                        //$("#" + submitButtonId).removeAttr("disabled");
                    }, 2000);
                    $("#" + submitButtonId).html(text);
                    //返回值为-200表示服务器内部异常，需要提示！
                    //if (data.code == -200 && !loadingAnimation) {
                    //    msg(data.message);
                    //}
                    //else {
                    onComplete(data);
                    //}
                });
}

/*
公共POST方法,执行完之后立即跳转，submitButton不会被重置为可用
formId:form表单ID
url: POST地址
submitButtonId:提交按钮id
onComplete:完成回调
*/
function postDataJump(formId, url, submitButtonId, onComplete) {
    $("#" + submitButtonId).addClass("btn_dis");
    //$("#" + submitButtonId).attr("disabled", "disabled");
    var text = $("#" + submitButtonId).html();
    $("#" + submitButtonId).html("正在提交...");
    var data = $("#" + formId).serialize();
    data = data + "&t=" + ticker();
    $.post(url,
                data,
                function (data) {
                    //$("#" + submitButtonId).removeClass("btn_disabled");
                    //$("#" + submitButtonId).removeAttr("disabled");
                    //$("#" + submitButtonId).html(text);
                    //返回值为-200表示服务器内部异常，需要提示！
                    if (data.code == -200 && !loadingAnimation) {
                        msg(data.message);
                    }
                    else {
                        onComplete(data);
                    }
                });
}


/*公共信息提示框
msg:提示信息
level:消息类型 0:success, 1:failure,2:remind, 3:false
*/
function msg(msg, level) {
    var back = $("#com_div_box");
    var boxObj;
    if (level === undefined || level === 0) {
        boxObj = $("#modify-ok-box");
        back.append(boxObj);
        boxObj.fadeIn();
        back.fadeIn();
        $("#modify-ok-text").html(msg);
    } else if (level === 1) {
        boxObj = $("#failure-box");
        back.append(boxObj);
        boxObj.fadeIn();
        back.fadeIn();
        $("#failure-text").html(msg);
        $("#failure-true,#failure-true1").click(function () {
            $(this).unbind('click');
            back.hide();
            boxObj.hide();
            enable_scroll();
        });
    } else if (level === 2) {
        boxObj = $("#modify-no-box");
        back.append(boxObj);
        boxObj.fadeIn();
        back.fadeIn();
        $("#modify-no-text").html(msg);
    }
    else if (level === 3) {
        boxObj = $("#modify-false-box");
        back.append(boxObj);
        boxObj.fadeIn();
        back.fadeIn();
        $("#modify-false-text").html(msg);
    }
    if (level != 1) {
        setTimeout(function () {
            boxObj.hide();
            back.hide();
            enable_scroll();
        }, 1800);
    }
    disable_scroll();

    //if (level === undefined) {
    //    $($("#infoBox").children('img')[0]).css("display", 'inline-block');
    //    $($("#infoBox").children('img')[1]).css("display", 'none');
    //} else {
    //    $($("#infoBox").children('img')[0]).css("display", 'none');
    //    $($("#infoBox").children('img')[1]).css("display", 'inline-block');
    //}

    //setTimeout(function () { $("#infoBox").fadeOut('slow') }, 1800);


    //setTimeout(function () { $("#winPrompt").fadeOut('slow') }, 5000);
}

function confirmBox(msg, fun, data) {
    var back = $("#com_div_box1");
    $("#confirm_true").click(function () {
        fun(data);
        $(this).unbind('click');
        back.hide();
        $("#confirmBox").hide();
        enable_scroll();
    });

    $("#confirm_cancel,#confirm_cancel1").click(function (e) {
        $("#confirm_true").unbind('click');
        back.hide();
        $("#confirmBox").hide();
        enable_scroll();
    });
    back.fadeIn();
    $("#confirmBox").fadeIn();
    $("#com-text").html(msg);
    disable_scroll();
}
/*
显示所有星级
*/
function renderStar() {
    $("div [star]").each(function (i, o) {
        var star = $(o).attr("star");
        $(o).children().each(function (j, l) {
            if (star > j) {
                $(l).removeClass("star_gray").addClass("star_on");
            }
        });
    });
}


/*
显示载入时的遮罩动画
*/
function showAnimation() {
    $("#transpond-box").show();
}

/*
停止显示载入时的遮罩动画
*/
function stopAnimation() {
    $("#transpond-box").hide();
}

/*
设置该值为true 则ajax 时显示遮罩动画 
*/
var loadingAnimation = false;

$(document).ajaxSend(function (e, xhr, setting) {
    if (setting.url.indexOf(sendUrl) != 0 && setting.url.indexOf(USER_ASSOCIATE_URL) != 0 && setting.url.indexOf(USER_GETASSOCIATE_URL) != 0) {
        if (loadingAnimation) {
            showAnimation();
        }
    }
});

$(document).ajaxComplete(function (a) {
    if (loadingAnimation) {
        stopAnimation();
    }
});
$(document).ajaxSuccess(function (evt, request, settings) {

});
//$(document).ajaxError(function (event, request, settings) {
//    if (loadingAnimation) {
//        stopAnimation();
//    }
//    msg(Page_Common_Ajax_Error, 2);   
//});


//跟随
function followTrader(trader, allowCancel) {
    requiredLogin(afterLogin, trader, allowCancel);
}

/*登录成功后回调，显示跟随列表*/
function afterLogin(trader, userObj, allowCancel) {
    if (USER_LOGIN_USER_TYPE != 1) {
        msg(Page_Common_Follow_Only_Customer, 2);
        return;
    }
    //$("#follow_trader_dlg").show();
    resetFollowDlg(userObj, trader, allowCancel);
    getDlgFollowInfo();
}

/*检测validate 对象中是否存在某字段的错误消息,没有错误返回false ,否则返回true*/

function isFieldError(id, validateObj) {
    var isError = false;
    try {
        for (var i = 0; i < validateObj.errorList.length; i++) {
            if (validateObj.errorList[i].element.id == id) {
                isError = true;
            }
        }
    }
    catch (e) { }

    return isError;
}

/*设置按钮60秒后可用*/
function setBtnInvalid(obj, enableClass) {
    if (enableClass == undefined || enableClass == '') {
        enableClass = "";
    }

    var bindEvent = obj.data("events").click[0];
    var originalText = obj.html();
    var timer = 60;
    obj.removeClass(enableClass);
    obj.attr("disabled", "disabled");
    //obj.css('background', '#b7b9c5');
    obj.unbind("click");
    var timerId = setInterval(function () {
        timer = timer - 1;
        obj.html("(" + timer + "秒)后重新发送");
        if (timer <= 0) {
            //obj.css('background', '#656571')
            obj.addClass(enableClass);
            obj.css('text-decoration', 'underline');
            obj.removeAttr("disabled");
            obj.html(originalText);
            obj.bind("click", bindEvent);
            clearInterval(timerId);
        }
    }, 1000);
}


/*所有时间控件的初始化*/
function loadDateTimePicker() {
    $(".laydate-icon").each(function (index, el) {
        var id = $(el).attr('id');
        laydate.skin('molv');
        $(el).click(function (event) {
            laydate({
                elem: '#' + id,
                choose: function (datas) {
                    //console.log(datas);
                    if (window['on_search'] != undefined) {
                        window['on_search'](id);
                    }
                }
            });
        });
    });
}


/*筛选切换样式改变*/
function exChange() {
    $(".screening dl a").click(function () {
        $(this).siblings('a').children('dd').removeClass('screening-r');
        $(this).children('dd').addClass('screening-r');
        var type = $(this).attr('toogleType');
        var val = $(this).attr('toogleVal');
        if (window["onTabChange"] != undefined) {
            window["onTabChange"](type, val);
        }
    });
    $('.screen_group .radio_box a').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        var type = $(this).attr('toogleType');
        var val = $(this).attr('toogleVal');
        if (window["onTabChange"] != undefined) {
            window["onTabChange"](type, val);
        }
    });
}

/** Tranding View 下单模块**/
function exshowHide() {
    $('.js_showtradingbox .sh_btnbox').click(function () {
        $(this).parents('.js_showtradingbox').toggleClass('hide');
    })
}

/*table排序*/
function tableSort() {
    $("table.i thead td,table.i thead th").click(function () {
        var feild = $(this).attr('feild');
        var tbodyId = $(this).closest('thead').next('tbody').attr("id");

        var sortId, sortType = $(this).children('i').attr('class');
        $(this).siblings().children('i').attr('class', 'upDown');
        if (sortType === 'upDown') {
            sortId = '';
            $(this).children('i').attr('class', 'down');
        } else if (sortType === 'down') {
            sortId = 0;//降序是0
            $(this).children('i').attr('class', 'up');
        } else if (sortType === 'up') {
            sortId = 1;//升序1
            $(this).children('i').attr('class', 'down');
        }
        if (window["onTableSort"] != undefined && feild != '') {
            window["onTableSort"](feild, sortId, tbodyId);
        }
    });
}

function commonSort() {
    $(".js_commonSort .js_sort").click(function () {
        var feild = $(this).attr('feild');

        var sortId, sortType = $(this).children('i').attr('class').trim();
        $(this).addClass('active').siblings().removeClass('active');
        $(this).siblings().children('i').attr('class', 'sort_downup');
        if (sortType === 'sort_downup') {
            sortId = '';
            $(this).children('i').attr('class', 'sort_down');
        } else if (sortType === 'sort_down') {
            sortId = 0;//降序是0
            $(this).children('i').attr('class', 'sort_up');
        } else if (sortType === 'sort_up') {
            sortId = 1;//升序1
            $(this).children('i').attr('class', 'sort_down');
        }
        if (window["onTabChange"] != undefined && feild != '') {
            window["onTabChange"](feild, sortId);
        }
    });
}

/*
    刷新用户关联数据,
    必须声明REQUIRED_USER_ASSOCIATE=true
*/
function getUserAssociate() {
    try {
        if (USER_ID != undefined && USER_ID != 0 && REQUIRED_USER_ASSOCIATE != undefined && REQUIRED_USER_ASSOCIATE === true) {
            $.post(USER_ASSOCIATE_URL, { 't': ticker() }, function (data) {
                USER_ASSOCIATE_OBJECT = data;
                refreshAssociateLink();
            });
        }
    } catch (e) {
    }
}

/*
    刷新关注、跟随按钮(屏蔽的代码是私信按钮取消是否关注的限制)
*/
function refreshAssociateLink() {
    $(".link_follow").removeClass('editfl');
    $(".link_follow").html("跟随");
    $(".link_attation").html("关注");
    //$(".btn_pf_menu").hide();
    //if ($(".pf_menulist").children().length > 1) {
    //    $(".btn_pf_menu").show();
    //}
    //$(".pri_msg").hide();
    if (USER_ASSOCIATE_OBJECT != null) {
        for (var i = 0; i < USER_ASSOCIATE_OBJECT.follows.length; i++) {
            var fLink = $("#follow_" + USER_ASSOCIATE_OBJECT.follows[i] + "_" + USER_ASSOCIATE_OBJECT.Index[i]);
            if (fLink != undefined) {
                fLink.addClass('editfl');
                fLink.html("编辑跟随");
            }

            //以下代码为兼容首页热门交易员 日收益，月收益，总收益 会出现同一个交易员的情况
            var traderAccount = "follow_" + USER_ASSOCIATE_OBJECT.follows[i] + "_" + USER_ASSOCIATE_OBJECT.Index[i];
            var fLinkAccount = $("[FollowTraderAccount='" + traderAccount + "']");
            if (fLinkAccount != undefined) {
                fLinkAccount.addClass('editfl');
                fLinkAccount.html("编辑跟随");
            }
        }
        for (var i = 0; i < USER_ASSOCIATE_OBJECT.attention.length; i++) {
            var fAtta = $("#atta_" + USER_ASSOCIATE_OBJECT.attention[i]);
            //var msgbtn = $("#pri_msg_" + USER_ASSOCIATE_OBJECT.attention[i]);
            //var btnlist = $("#btn_list_" + USER_ASSOCIATE_OBJECT.attention[i]);
            if (fAtta != undefined) {
                fAtta.html("已关注");
                //btnlist.show();
                //msgbtn.show();
            }
        }

        if (window["onRefreshAssociate"] != undefined) {
            window["onRefreshAssociate"]();
        }
    }
}
/*
    关注
*/
function attentionUser(userId) {
    requiredLogin(onattention, userId);
}
function onattention(userId) {
    $.post("/Social/Blog/AttentionOrNo", { id: userId }, function (data) {
        if (!data && USER_ID == userId) {
            msg("无法关注自己");
        } else {
            getUserAssociate();
            if (window['onChangeData'] != undefined) {
                window['onChangeData'](userId);
            }
        }
    });
}

function screening_click() {
    $(".screening_click").find('select').change(function () {
        var id = $(this).attr('id');
        if (window['on_search'] != undefined) {
            window['on_search'](id);
        }
    });
    $(".screening_click").find("input[class!='laydate-icon']").blur(function () {
        var id = $(this).attr('id');
        if (window['on_search'] != undefined) {
            window['on_search'](id);
        }
    });
}

var HtmlUtil = {
    /*1.用浏览器内部转换器实现html转码*/
    htmlEncode: function (html) {
        var temp = document.createElement("div");
        (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    },
    /*2.用浏览器内部转换器实现html解码*/
    htmlDecode: function (text) {
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    },
    /*去除空格，包括‘&nbsp;’也去除*/
    textTrim: function (text) {
        text = text.replace(/&nbsp;/g, "");
        return text.replace(/(^\s*)|(\s*$)/g, "");
    },
    /*截取固定长度字符串，超过部分替换为...*/
    cutStr: function (str, len) {
        if (str == null || str == "")
            return str;
        var str_length = 0;
        var str_len = 0;
        var isimg = false;
        var isalink = false;
        str_cut = new String();
        str_len = str.length;
        for (var i = 0; i < str_len; i++) {
            a = str.charAt(i);
            if (a == '<') {
                var imgstr = a + str.charAt(i + 1) + str.charAt(i + 2) + str.charAt(i + 3);
                if (imgstr == "<img") {
                    isimg = true;
                }
                var linkstr = a + str.charAt(i + 1);
                if (linkstr == "<a") {
                    isalink = true;
                }
            }
            if (a == '>') {
                if (isimg)
                    isimg = false;
                var linkstr = str.charAt(i - 3) + str.charAt(i - 2) + str.charAt(i - 1) + a;
                if (linkstr == "</a>" && isalink) {
                    isalink = false;
                }
            }

            if (!isimg && !isalink)
                str_length++;
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；  
        if (str_length < len) {
            return str;
        }
    },
    //去除HTML标签
    getBodyTxt: function (body) {
        if (body) {
            body = body.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
            body = body.replace(/&nbsp;/ig, '');//去掉&nbsp;
        }
        return body;
    }
};

//获取粉丝和关注人数(userid=0,为当前登录用户)
function GetAttAndFansCount(userid, onCallback) {
    var returnUrl = '/Social/Attention/GetAttAndFansCount';
    $.post(
            returnUrl,
            { userId: userid },
            function (data) {
                onCallback(data);
            }
    );
}

function jsonpCallback(data) {
    //console.log(data);

}
var errorCount = 0;//消息请求错误次数
//消息提醒
function getLatestMessage() {
    //定时查询用户是否登录，是否存在,如果不存在则不查询消息，否则查询实时消息
    if (USER_ID === undefined || USER_ID === 0) {
        //$("#messageBell").addClass("i_bell_dot");
    } else {
        // var returnUrl = "/SocialRemind/" + USER_ID + "/" + ticker();
        // var returnUrl = 'http://192.168.0.254:58587/message?userID=' + USER_ID + '&t=' + ticker() + '&callback=jsonpCallback';
        var returnUrl = msgRemind_Url + '?userID=' + USER_ID + '&t=' + ticker() + '&callback=jsonpCallback';

        if (errorCount <= 3) {
            $.ajax({
                dataType: 'jsonp',
                url: returnUrl,
                success: function (data) {
                    try {
                        if (data != null) {
                            var counter = 0; //消息计数器
                            $("#MyFans_Menu_count").remove();
                            $("#Comment_Menu_count").remove();
                            $("#At_Menu_count").remove();
                            $("#Private_Msg_count").remove();
                            $("#remindMessageBox").children().hide();
                            $("#messageBell").removeClass("msg_new");
                            $("#remindMessageBox").hide();
                            if (typeof (data) == 'string')
                                data = JSON.parse(data);
                            if (data.c > 0) {
                                $("#Comment_Menu").parent().append('<span class="user-nav-prompt" id="Comment_Menu_count">' + data.c + '</span>');
                                $("#newCommon").show();
                                $("#newCommonCount").html(data.c);
                                counter++;
                            }
                            if (data.a > 0) {
                                $("#At_Menu").parent().append('<span class="user-nav-prompt" id="At_Menu_count">' + data.a + '</span>');
                                $("#At_Menu").parent().parent().attr('href', '/Social/Home/AtMeBlog?tab=1&count=' + data.t);
                                $("#newAT").show();
                                $("#newATCount").html(data.a);
                                counter++;
                                if (data.t > 0 && data.b === 0) {
                                    $("#newAT").find('a').attr('href', '/Social/Home/AtMeBlog?tab=2');
                                } else if (data.t === 0 && data.b > 0) {
                                    $("#newAT").find('a').attr('href', '/Social/Home/AtMeBlog');
                                } else {
                                    $("#newAT").find('a').attr('href', '/Social/Home/AtMeBlog?tab=1&count=' + data.t);
                                }
                            }
                            if (data.f > 0) {
                                $("#MyFans_Menu").parent().append('<span class="user-nav-prompt" id="MyFans_Menu_count">' + data.f + '</span>');//显示新增的数目
                                //刷新粉丝总数
                                GetAttAndFansCount(0, function (data) {
                                    $("#MyFans_Menu").text('（' + data.fancount + '）');
                                });
                                $("#newfans").show();
                                $("#newfansCount").html(data.f);
                                counter++;
                            }
                            //私信消息
                            if (data.m > 0) {
                                $("#Msg_Menu").parent().append('<span class="user-nav-prompt" style="font-size:12px;" id="Private_Msg_count">' + data.m + '</span>');//导航上显示新增的数目
                                $("#newPrivateMsg").show();
                                $("#newMsgCount").html(data.m);
                                counter++;
                            }

                            if (counter > 0) {
                                try {
                                    var msgNums = localStorage.getItem("U_NewMsgCount");
                                    if (msgNums == null) {
                                        musicPlay('newMsg');
                                    } else {
                                        if (counter > msgNums) musicPlay('newMsg');
                                    }
                                    localStorage.setItem("U_NewMsgCount", counter);
                                } catch (e) { }

                                $("#messageBell").addClass("msg_new");
                                $("#remindMessageBox").show();
                            } else {
                                try {
                                    localStorage.removeItem("U_NewMsgCount");
                                } catch (e) { }
                            }
                        }
                    } catch (e) {
                    }
                },
                timeout: 3000,
                error: function () {
                    console.log("服务器远程连接失败。。。");
                    errorCount++;
                }
            });
        }


        //$.post(returnUrl, function (data) {
        //    if (data != null) {
        //        $("#MyFans_Menu_count").remove();
        //        $("#Comment_Menu_count").remove();
        //        $("#At_Menu_count").remove();
        //        $("#Private_Msg_count").remove();
        //        $("#remindMessageBox").children().hide();
        //        $("#messageBell").removeClass("i_bell");
        //        if (data.newCommonCount > 0) {
        //            $("#Comment_Menu").parent().append('<span class="user-nav-prompt" id="Comment_Menu_count">' + data.newCommonCount + '</span>');
        //            $("#newCommon").show();
        //            $("#newCommonCount").html(data.newCommonCount);
        //            $("#messageBell").addClass("i_bell");
        //        }
        //        if (data.newATCount > 0) {
        //            $("#At_Menu").parent().append('<span class="user-nav-prompt" id="At_Menu_count">' + data.newATCount + '</span>');
        //            $("#At_Menu").parent().parent().attr('href', '/Social/Home/AtMeBlog?tab=1&count=' + data.newATCommon);
        //            $("#newAT").show();
        //            $("#newATCount").html(data.newATCount);
        //            $("#messageBell").addClass("i_bell");
        //            if (data.newATCommon > 0 && data.newATBlog===0) {
        //                $("#newAT").find('a').attr('href', '/Social/Home/AtMeBlog?tab=2');
        //            } else if (data.newATCommon === 0 && data.newATBlog > 0) {
        //                $("#newAT").find('a').attr('href', '/Social/Home/AtMeBlog');
        //            } else {
        //                $("#newAT").find('a').attr('href', '/Social/Home/AtMeBlog?tab=1&count=' + data.newATCommon);
        //            }
        //        }
        //        if (data.newfansCount > 0) {
        //            $("#MyFans_Menu").parent().append('<span class="user-nav-prompt" id="MyFans_Menu_count">' + data.newfansCount + '</span>');//显示新增的数目
        //            //刷新粉丝总数
        //            GetAttAndFansCount(0, function (data) {
        //                $("#MyFans_Menu").text('（' + data.fancount + '）');
        //            });
        //            $("#newfans").show();
        //            $("#newfansCount").html(data.newfansCount);
        //            $("#messageBell").addClass("i_bell");
        //        }
        //        //私信消息
        //        if (data.newMsgCount > 0) {
        //            $("#Msg_Menu").parent().append('<span class="user-nav-prompt" id="Private_Msg_count">' + data.newMsgCount + '</span>');//导航上显示新增的数目
        //            $("#newPrivateMsg").show();
        //            $("#newMsgCount").html(data.newMsgCount);
        //            $("#messageBell").addClass("i_bell");
        //        }
        //    }
        //});
    }
}

function GetUserTypeIcon(id) {
    var title = "";
    var classValue = "";

    switch (id) {
        case 0:
            classValue = " status-ordinary ";
            title = "普通用户";
            break;
        case 1:
            classValue = " status-traders ";
            title = "交易员";
            break;
        case 2:
            classValue = " status-investors ";
            title = "投资人";
            break;
    }
    var result = "<i title='" + title + "' class='icon status-i " + classValue + "'></i>";
    return result;
}

function Num2K(num) {
    var param = 1000;
    var numResult = "";
    if (pareFloat(num) > 1000 || pareFloat(num) < -1000) {
        numResult = (pareFloat(num) / param).toFixed(2) + "K";
    }
    else {
        numResult = pareFloat(num).toFixed(2);
    }
    return num;
}

//根据经纪商id返回经纪商logo的title描述
function BrokerIdTitle(brokerid) {
    var result = "";
    switch (brokerid) {
        default:
            result = "";
            break;
        case 1:
            result = "关联晋峰环球国际经纪商账户";
            break;
        case 2:
            result = "关联晋峰金银业经纪商账户";
            break;
        case 4:
            result = "关联FXCM经纪商账户";
            break;
        case 5:
            result = "关联KVB经纪商账户";
            break;
    }
    return result;
}


//全局的一个评论位置
var comitPosition = 0;
function getPosition() {
    comitPosition = $(document).scrollTop();
}
function setPosition() {
    $(document).scrollTop(comitPosition);
}

//验证是否含有Html标签
function checkPercentHtml(str) {
    //var re = new RegExp('^<([^>\s]+)[^>]*>(.*?<\/\\1>)?$');
    //if (re.test(str)) {
    //    return true;
    //} else {
    //    return false;
    //}

    //不包含尖括号的可以通过验证
    if (str.indexOf("<") < 0 && str.indexOf(">") < 0) {
        return true;
    }
    return false;
}


//禁用滚动条事件start

var keys = [37, 38, 39, 40];

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
    preventDefault(e);
}

function disable_scroll() {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}

//禁用滚动事件end

//设置底部固定在最底下
$(function () {
    function setFixedFooter() {
        if (getOs() == "Firefox") {
            var minHeight = $(window).height() - 46;
        } else {
            var minHeight = $(window).height() - 76;
        }

        $('.wrapper').css("min-height", minHeight + 'px');
    }
    function getOs() {
        var OsObject = "";
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            return "MSIE";
        }
        if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
            return "Firefox";
        }
        if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
            return "Safari";
        }
        if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
            return "Camino";
        }
        if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
            return "Gecko";
        }

    }
    $(window).resize(function () {
        setFixedFooter();
    })
    setFixedFooter();
    //$('.wrapper')
})

/**表格点击当行变色**/
$(function () {


    $('table.tr_Diff>tbody').delegate('tr', 'click', function (e) {
        if (e.target.nodeName != 'TD') {
            return;
        }
        if ($(this).attr("name") == "tr_noData" || $(this).attr('class') == "colspan_tablebox") {
            return;
        }
        $(this).toggleClass('current').siblings().removeClass('current');
    })


})


var audio;//聲音對象
//傳入指定聲音格式，發出聲音
function musicPlay(type) {
    if (audio == null || audio == undefined && audio.canPlayType) {
        audio = document.createElement("audio");
    } else {
        audio.pause();
    }
    audio.src = '/Themes/DefaultClean/Sounds/' + type + '.mp3';
    audio.play();
}

//获取URL的指定参数值
function GetUrlQuery(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);

    return null;
}