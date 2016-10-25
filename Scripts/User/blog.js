$(function () {
    $(document).click(function (event) {
        var id = $(event.target).attr('id');
        $("#i-public-box").hide();
        $("#i-classify-box").hide();
        $("#" + id + "-box").show();
    });
    if ($(".emotion").length > 0) {
        $(".emotion").qqFace({
            id: 'facebox', //表情盒子的ID
            assign: 'saytext', //给那个控件赋值
            path: 'face/'  //表情存放的路径
        });
    }
});


//显示隐藏长微博
function showAnHideLongBlog(id, fn, args) {
    requiredLogin(function() {
        if (typeof fn === "function") {
            fn.apply(this, args);
        }
        $("#" + id).toggle();
    });

}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}



//发布微博，评论，回复，各个小功能框点击的显示和隐藏
function showAnHide(id) {

    var nicesx = $(".nui-scroll").niceScroll({ touchbehavior: false, cursorcolor: "#a3a6af", cursoropacitymax: 0.6, cursorwidth: 8, horizrailenabled: false });
    if ($("#" + id).is(":hidden")) { //显示的时候加载
        var bid;
        if (id.indexOf('i-user-box-') >= 0) {
            bid = id.replace('i-user-box-','');
            loadFollowers("", "saytext" + bid, "i-user-box-" + bid);//发表微信框关注列表
        }
        if (id.indexOf('i-user-box_') >= 0) {
            bid = id.replace('i-user-box_', '');
            loadFollowers("", "saytexts_" + bid, "i-user-box_" + bid);//发表微信框关注列表
        }
        if (id.indexOf('hot-user-box-') >= 0) {
            bid = id.replace('hot-user-box-', '');
            loadFollowers("", "hot_saytext" + bid, "hot-user-box-" + bid);//热门微博评论关注列表
        }
        if (id.indexOf('hot-user-box_') >= 0) {
            bid = id.replace('hot-user-box_', '');
            loadFollowers("", "hot_saytexts_" + bid, "hot-user-box_" + bid);//发表微信框关注列表
        }
        if (id === 'i-user-box') {
            loadFollowers("", "saytext1", "i-user-box");//发表微信框关注列表
        }
        if (id === 'i-user-box1') {
            loadFollowers("", "saytext3", "i-user-box1");//发表微信框关注列表
        }
    }
    if (id === 'forwar-box') {
        $("#saytext3").html('');
    }
    $("#" + id).find('input').val('');
    $("#" + id).toggle();
}

//发布微博，评论，回复，各个小功能框点击的显示和隐藏
function showAnHideLong(id) {

    var nicesx = $(".nui-scroll").niceScroll({ touchbehavior: false, cursorcolor: "#a3a6af", cursoropacitymax: 0.6, cursorwidth: 8, horizrailenabled: false });
    if ($("#" + id).is(":hidden")) { //显示的时候加载
        loadFollowersLong("", "i-userLong-box");//发表微信框关注列表
    }
    $("#" + id).toggle();
}

//@用户添加用户到对应的发表框框中   bid:加载@用户列表框   obj:选中的关注对象
function aiTeUserLong(bid, obj) {
    var html = '@' + $(obj).text() + ' &nbsp;';
    var ueContent = editor.getContentTxt();//编辑器已有的内容
    if (ueContent.indexOf($.trim($(obj).text())) > -1) {
        dialog.popup.hide();
        return;
    } else {
        editor.execCommand("inserthtml", html);
//       editor.setContent(text, true);
    }
    dialog.popup.hide();
}

function getTxt1CursorPosition(id) {
    var oTxt1 = document.getElementById(id);
    var cursurPosition = -1;
    if (oTxt1.selectionStart>=0) {//非IE浏览器
        cursurPosition = oTxt1.selectionStart;
    } else {//IE
        var range = document.selection.createRange();
        range.moveStart("character", -oTxt1.value.length);
        cursurPosition = range.text.length;
    }
    
}
function setTxt1CursorPosition(i) {
    var oTxt1 = document.getElementById("txt2");
    var cursurPosition = -1;
    if (oTxt1.selectionStart) {//非IE浏览器
        oTxt1.selectionStart = i;
    } else {//IE
        var range = oTxt1.createTextRange();
        range.move("character", i);
        range.select();
    }
}
function getTa1CursorPosition() {
    var evt = window.event ? window.event : getTa1CursorPosition.caller.arguments[0];
    var oTa1 = document.getElementById("ta1");
    var cursurPosition = -1;
    if (oTa1.selectionStart) {//非IE浏览器
        cursurPosition = oTa1.selectionStart;
    } else {//IE
        var range = oTa1.createTextRange();
        range.moveToPoint(evt.x, evt.y);
        range.moveStart("character", -oTa1.value.length);
        cursurPosition = range.text.length;
    }
    alert(cursurPosition);
}
function setTa1CursorPosition(i) {
    var oTa2 = document.getElementById("ta2");
    if (oTa2.selectionStart) {//非IE浏览器
        oTa2.selectionStart = i;
        oTa2.selectionEnd = i;
    } else {//IE
        var range = oTa2.createTextRange();
        range.move("character", i);
        range.select();
    }
}
//@用户添加用户到对应的发表框框中
function aiTeUser(id, bid, obj) {
    var oTxt1 = document.getElementById(id);
    var cursurPosition = -1;
    if (oTxt1.selectionStart >= 0) {//非IE浏览器
        cursurPosition = oTxt1.selectionStart;
    } else {//IE
        var range = document.selection.createRange();
        range.moveStart("character", -oTxt1.value.length);
        cursurPosition = range.text.length;
    }
    var text = '@' + $(obj).html() + ' ';
    var val = $("#" + id).val();
    var beforeText = val.substring(0, cursurPosition);
    var afterText = val.substring(cursurPosition, val.length);
    if (val.indexOf(text) >= 0) {
        $("#" + bid).hide();
        return;
    }
    val = beforeText + text + afterText;
    var textPositon = beforeText.length + text.length;
    $("#" + id).val(val);
    $("#" + bid).hide();
    oTxt1.focus();
    if (oTxt1.selectionStart >= 0) {//非IE浏览器
        oTxt1.selectionStart = textPositon;
        oTxt1.selectionEnd = textPositon;
    } else {//IE
        var range = oTxt1.createTextRange();
        range.move("character", textPositon);
        range.select();
    }
}

//分类，公开功能点击换值
function changeModel(id,bid,obj) {
    var text = $(obj).html();
    $("#" + id).html(text);
    $("#" + bid).hide();
}
/*
    评论模块
*/

//点击评论打开和关闭相对应的评论框，id是对应框id
var beforeId;//记住前一次点击的事件源
var addLine = false;
function commit(id,obj) {
    var mark = $(obj).attr('content');
    var firstClick = $("#firstClick-" + id);
    if (beforeId === id) {
        firstClick.val()==='false'?'true':'false';
    } else {
        $(".wb-comments").slideUp();
        firstClick.val('true');
    }
    if (firstClick.val() === 'true') {
        if (mark != 'replayme') {
            LoadCommentBlog(id);//加载评论
        }
        //loadFollowers("", "saytext" + id, "i-user-box-" + id);//评论框关注列表
        $("#commit-box-" + id).slideDown();
        if (addLine ===true) {
            //添加评论列表下边线
            $(".line-content").addClass('line-content-xt');
            $("#commit-box-" + id).prev().removeClass('line-content-xt');
        }
        firstClick.val('false');
    } else {
        $("#commit-box-" + id).slideUp();
        if (addLine === true) {
            //添加评论列表下边线
            $(".line-content").addClass('line-content-xt');
            $("#commit-box-" + id).prev().addClass('line-content-xt');
        }
        firstClick.val('true');
    }
    beforeId = id;
    $(".emotion").qqFace({
        id: 'facebox', //表情盒子的ID
        assign: 'saytext', //给那个控件赋值
        path: 'face/'  //表情存放的路径
    });
}


//热门微博点击评论打开和关闭相对应的评论框，id是对应框id
var hot_beforeId;//记住前一次点击的事件源
var hot_addLine = false;
function hot_commit(id, obj) {
    var mark = $(obj).attr('content');
    var hot_firstClick = $("#hot_firstClick-" + id);
    if (hot_beforeId === id) {
        hot_firstClick.val() === 'false' ? 'true' : 'false';
    } else {
        $(".hot_wb-comments").slideUp();
        hot_firstClick.val('true');
    }
    if (hot_firstClick.val() === 'true') {
        if (mark != 'replayme') {
            hot_LoadCommentBlog(id);//加载评论
        }
        //loadFollowers("", "saytext" + id, "i-user-box-" + id);//评论框关注列表
        $("#hot_commit-box-" + id).slideDown();
        if (hot_addLine === true) {
            //添加评论列表下边线
            $(".line-content").addClass('line-content-xt');
            $("#hot_commit-box-" + id).prev().removeClass('line-content-xt');
        }
        hot_firstClick.val('false');
    } else {
        $("#hot_commit-box-" + id).slideUp();
        if (hot_addLine === true) {
            //添加评论列表下边线
            $(".line-content").addClass('line-content-xt');
            $("#hot_commit-box-" + id).prev().addClass('line-content-xt');
        }
        hot_firstClick.val('true');
    }
    hot_beforeId = id;
    $(".emotion").qqFace({
        id: 'facebox', //表情盒子的ID
        assign: 'hot_saytext', //给那个控件赋值
        path: 'face/'  //表情存放的路径
    });
}

//点击回复打开和关闭相对应的回复框，id是对应框id
var beforeReId;//记住前一次点击的事件源
function reply(id) {
    var firstClick = $("#firstClick-" + id);
    if (beforeReId === id) {
        firstClick.val() === 'false' ? 'true' : 'false';
    } else {
        $(".wb-com-reply").slideUp();
        firstClick.val('true');
    }
    if (firstClick.val() === 'true') {
        $("#wb-com-reply" + id).slideDown();
        firstClick.val('false');
    } else {
        $("#wb-com-reply" + id).slideUp();
        firstClick.val('true');
    }
    beforeReId = id;
    $(".emotion").qqFace({
        id: 'facebox', //表情盒子的ID
        assign: 'saytext', //给那个控件赋值
        path: 'face/'  //表情存放的路径
    });
}


//热门微博点击回复打开和关闭相对应的回复框，id是对应框id
var hot_beforeReId;//记住前一次点击的事件源
function hot_reply(id) {
    var firstClick = $("#hot_firstClick-" + id);
    if (hot_beforeReId === id) {
        firstClick.val() === 'false' ? 'true' : 'false';
    } else {
        $(".hot-wb-com-reply").slideUp();
        firstClick.val('true');
    }
    if (firstClick.val() === 'true') {
        $("#hot-wb-com-reply" + id).slideDown();
        firstClick.val('false');
    } else {
        $("#hot-wb-com-reply" + id).slideUp();
        firstClick.val('true');
    }
    hot_beforeReId = id;
    $(".emotion").qqFace({
        id: 'facebox', //表情盒子的ID
        assign: 'hot_saytext', //给那个控件赋值
        path: 'face/'  //表情存放的路径
    });
}




