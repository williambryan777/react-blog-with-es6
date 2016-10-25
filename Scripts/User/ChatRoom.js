var preRoomId = '-1';
var currentRoomId = '-1';
var currentMessTime = 0;
var userinfo;
var dict = new dictionary();
var myAtt = new dictionary();
var chatRoom = new ChatRoom();
var store = new historyMessagesStore();
var lastMessTime = 0;

//累积的Dom节点数
var totalNum = 0;
//是否显示提示信息
var hasSysMsg = false;
var autoLoadHandler, updateOnlineHandler;

//聊天室列表分为完整模式（聊天室名称、简介、自建、新消息提醒）、精简（只显示聊天室名称）
var listType = 1; //完整模式
var roomListTemp = '<li $class$ id="$domId$" onclick="chatRoom.Join($roomId$)" hTitle="$title$" hAuthor="$author$" hDesc="$desc$" onmousemove="moveEvent(this)" onmouseout="outEvent()">'
                    + '<div class="box1"><span class="times">$nums$人</span>'
                    + '<p class="chat_name">$name$</p></div>'
                    + '<div class="msg_box"><p class="msg_cont">$intro$</p></div></li>';

var messListTemp = '<li class="left_msg_box clearfix">'
                    + '<div class="user_pic_box"><a href="/UserPage/$userId$" target="_blank"><img src="/Avata/$userId$" class="imgShadow" alt=""></a>'
                    + '<i class="identity_sb_icon identity_$userType$"></i></div>'
                    + '<div class="user_txt_box">'
                        + '<a href="/UserPage/$userId$" class="user_name_txt maxw930_152 ellipsis930" title="$userName$" target="_blank">$userName$</a>'
                        + '<div class="msgbox">$messContent$</div>'
                    + '</div>'
                + '</li>';

var selfMessTemp = '<li class="right_msg_box clearfix">'
                    + '<div class="user_pic_box"><a href="/UserPage/$userId$" target="_blank"><img src="/Avata/$userId$" class="imgShadow" alt=""></a>'
                    + '<i class="identity_sb_icon identity_$userType$"></i></div>'
                    + '<div class="user_txt_box">'
                        + '<div class="msgbox">$messContent$</div>'
                    + '</div>'
                + '</li>';


//Init
//==============================Begin===================================
// 初始化。
RongIMLib.RongIMClient.init(APP_KEY);
//表情库初始化
RongIMLib.RongIMEmoji.init();

// 设置连接监听状态 （ status 标识当前连接状态）
RongIMLib.RongIMClient.setConnectionStatusListener({
    onChanged: function (status) {
        switch (status) {
            case RongIMLib.ConnectionStatus.CONNECTED:
                //console.log('连接成功(聊天室)');
                break;
            case RongIMLib.ConnectionStatus.CONNECTING:
                //console.log('正在连接(聊天室)');
                break;
            case RongIMLib.ConnectionStatus.DISCONNECTED:
                console.log('断开连接(聊天室)');
                break;
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                $("#messContentList li[neterror=1]").remove();
                $("#messContentList").append("<li neterror=1 class='times_txt clearfix' style='color:#ff3d3d;'>该账号在其他设备登录。<br/><a href='javascript:void(0);' onclick='chatRoom.Login(true)'>重新连接</a></li>");
                scrollToBottom();
                break;
            case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                console.log('域名不正确(聊天室)');
                break;
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                $("#messContentList li[neterror=1]").remove();
                $("#messContentList").append("<li neterror=1 class='times_txt clearfix' style='color:red;font-weight:bold'>当前网络不可用，请确保您的网络连接是正常的。<br/><a href='javascript:void(0);' onclick='chatRoom.Login(true)'>重新连接</a></li>");
                scrollToBottom();
                break;
        }
    }
});

// 消息监听器
RongIMLib.RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function (message) {
        // 判断消息类型
        switch (message.messageType) {
            case RongIMLib.RongIMClient.MessageType.TextMessage:
                var sendTime = dateDiff(message.sentTime);
                var content = htmlEncode(message.content.content);

                var icon = 'investors';
                var nickName = '';
                var userId = message.senderUserId;
                if (userId.indexOf('guest') > -1) {
                    break;
                }

                if (message.content.extra != null) {
                    try {
                        var messJson = JSON.parse(message.content.extra);
                        switch (messJson.icon) {
                            case '2': {
                                icon = 'investors'; break;
                            }
                            case '1': {
                                icon = 'traders'; break;
                            }
                        }
                        nickName = messJson.name;
                    } catch (e) { }
                }

                var contentList = "";
                if (currentMessTime + 60000 < message.sentTime) {
                    if (userinfo.userId == userId)
                        contentList = ('<li sendtime="' + message.sentTime + '" class="times_txt clearfix">' + sendTime + '</li>' + selfMessTemp).replace(/\$userId\$/g, userId).replace("$userType$", icon).replace("$messContent$", RongIMLib.RongIMEmoji.emojiToHTML(content));
                    else
                        contentList = ('<li sendtime="' + message.sentTime + '" class="times_txt clearfix">' + sendTime + '</li>' + messListTemp).replace(/\$userId\$/g, userId).replace("$userName$", nickName).replace("$userName$", nickName).replace("$userType$", icon).replace("$messContent$", RongIMLib.RongIMEmoji.emojiToHTML(content));
                }
                else {
                    if (userinfo.userId == userId)
                        contentList = selfMessTemp.replace(/\$userId\$/g, userId).replace("$userType$", icon).replace("$messContent$", RongIMLib.RongIMEmoji.emojiToHTML(content));
                    else
                        contentList = messListTemp.replace(/\$userId\$/g, userId).replace("$userName$", nickName).replace("$userName$", nickName).replace("$userType$", icon).replace("$messContent$", RongIMLib.RongIMEmoji.emojiToHTML(content));
                }

                $("#messContentList").append(contentList);

                if (totalNum > 1000) {
                    $("#messContentList li:lt(100)").remove();
                }

                scrollToBottom();

                if (currentMessTime + 60000 < message.sentTime) {
                    currentMessTime = message.sentTime;
                    $("#messContentList li[sendtime]").each(function () {
                        $(this).text(dateDiff(parseInt($(this).attr('sendtime'))));
                    });
                }

                totalNum++;

                saveHistoryMessages(message, icon, nickName);

                break;
            case RongIMLib.RongIMClient.MessageType.VoiceMessage:
                // 对声音进行预加载                
                // message.content.content 格式为 AMR 格式的 base64 码
                break;
            case RongIMLib.RongIMClient.MessageType.ImageMessage:
                // message.content.content => 图片缩略图 base64。
                // message.content.imageUri => 原图 URL。
                break;
            case RongIMLib.RongIMClient.MessageType.DiscussionNotificationMessage:
                // message.content.extension => 讨论组中的人员。
                break;
            case RongIMLib.RongIMClient.MessageType.LocationMessage:
                // message.content.latiude => 纬度。
                // message.content.longitude => 经度。
                // message.content.content => 位置图片 base64。
                break;
            case RongIMLib.RongIMClient.MessageType.RichContentMessage:
                // message.content.content => 文本消息内容。
                // message.content.imageUri => 图片 base64。
                // message.content.url => 原图 URL。
                break;
            case RongIMLib.RongIMClient.MessageType.InformationNotificationMessage:
                //var sendTime = new Date(message.sentTime).Format("yyyy-MM-dd hh:mm");

                if (hasSysMsg && userinfo.userId != message.senderUserId) {

                    var content;
                    try {
                        content = htmlEncode(decodeURIComponent(message.content.message));
                    } catch (e) {
                        content = htmlEncode(message.content.message);
                    }

                    if ($("#joinInfoMsg").is(":hidden")) {
                        $("#joinInfoMsg").html(content).fadeIn(2000, function () { $(this).fadeOut(); });
                    } else {
                        $("#joinInfoMsg").html(content).fadeOut(2000);
                    }
                }
                break;
            case RongIMLib.RongIMClient.MessageType.ContactNotificationMessage:
                //console.log('ContactNotificationMessage');
                break;
            case RongIMLib.RongIMClient.MessageType.ProfileNotificationMessage:
                //console.log('ProfileNotificationMessage');
                break;
            case RongIMLib.RongIMClient.MessageType.CommandNotificationMessage:
                //console.log('CommandNotificationMessage');
                break;
            case RongIMLib.RongIMClient.MessageType.CommandMessage:
                //console.log('CommandMessage');
                break;
            case RongIMLib.RongIMClient.MessageType.UnknownMessage:
                //console.log('UnknownMessage');
                break;
            default:
                // do something...
        }
    }
});

setTimeout(function () {
    chatRoom.Login();

    $("#emotionList").smohanfacebox({
        Event: "click",	//触发事件	
        divid: "emotionList", //外层DIV ID
        textid: "txtMessContent" //文本框 ID
    });
}, 100);

//=========================================End==========================================


function ChatRoom() {
    //登录
    this.Login = function (ext) {
        $.ajax({
            type: 'POST',
            url: '/Social/ChatRoom/GetToken'
        }).done(function (rs) {
            if (rs.token != null) {
                RongIMLib.RongIMClient.connect(rs.token, {
                    onSuccess: function (userId) {
                        userinfo = new RongIMLib.UserInfo(userId, rs.name, rs.type);

                        clearInterval(autoLoadHandler);

                        //精简模式
                        if ($("#selChatRoom").length > 0) {
                            listType = 0;
                            roomListTemp = '<option value=$roomId$ nameShow=$name$>$name$</option>';
                        }

                        chatRoom.LoadList(rs.last);

                        autoLoadHandler = setInterval(function () {
                            chatRoom.LoadList();
                        }, 10000);

                        if (ext) {
                            $("#messContentList li[neterror]").remove();
                            msg("连接成功", 1);
                        }
                    },
                    onTokenIncorrect: function () {
                        msg("连接聊天室失败。", 1);
                    },
                    onError: function (errorCode) {
                        var info = '';
                        switch (errorCode) {
                            case RongIMLib.ErrorCode.TIMEOUT:
                                info = '超时';
                                break;
                            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                                info = '未知错误';
                                break;
                            case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                                info = '不可接受的协议版本';
                                break;
                            case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                                info = 'appkey不正确';
                                break;
                            case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                                info = '服务器不可用';
                                break;
                        }
                        msg("连接聊天室失败。", 1);
                    }
                });
            }
            else {
                msg("连接聊天室失败。", 1);
            }
        }).error(function () {
            msg("连接聊天室失败。", 1);
        });
    },

    //加入聊天室
    this.Join = function (roomId) {
        if (currentRoomId == roomId)
            return;

        hasSysMsg = false;
        currentMessTime = 0;
        totalNum = 0;
        $("#messContentList").html('');

        var count = 0;// 拉取最近聊天最多 20 条。
        RongIMLib.RongIMClient.getInstance().joinChatRoom(roomId, count, {
            onSuccess: function () {
                currentRoomId = roomId;

                if (listType == 1) {
                    //完整模式
                    if (myAtt.items(roomId) != null) {
                        if (myAtt.items(roomId).isSelf == true) {
                            $("#attRoomOper").hide();
                        } else {
                            $("#attRoomOper").show();
                            $("#attRoomOper").text('取消关注').addClass('cancelfl');
                        }
                    } else {
                        $("#attRoomOper").show();
                        $("#attRoomOper").text('关注').removeClass('cancelfl');
                    }

                    if ($("#roomList" + roomId).length > 0) {
                        $("#roomList" + roomId).addClass("active");
                        $("#roomList" + roomId).siblings().removeClass("active");
                        $("#roomList" + roomId).removeClass("new_msg");
                    }
                    if ($("#selfRoomList" + roomId).length > 0) {
                        $("#selfRoomList" + roomId).addClass("active");
                        $("#selfRoomList" + roomId).siblings().removeClass("active");
                        //$("#selfRoomList" + roomId).removeClass("new_msg");
                    }

                    $("#chatRoomName").text(dict.items(roomId).name);
                    $("#chatRoomIntro").text(dict.items(roomId).intro);

                    //更新在线人数
                    clearInterval(updateOnlineHandler);
                    updateOnlineHandler = setInterval(function () { getChatRoomOnline(currentRoomId) }, 2000);
                } else {
                    //精简模式
                    $("#selChatRoom").val(roomId);
                }

                $("#btnSendMess").off("click");
                $("#btnSendMess").on("click", function () {
                    requiredLogin(chatRoom.SendMsg, roomId);
                });

                if ($("#chatNewMsg").length > 0) {
                    if ($("#chatNewMsg").parent().hasClass("active") == true) UpdateMyAttent(roomId, preRoomId);
                } else {
                    UpdateMyAttent(roomId, preRoomId);
                }

                //对小灰条做延时提示
                setTimeout(function () { hasSysMsg = true }, 5000);

                //进入聊天室的提示(小灰条)
                var joinInfo = RongIMLib.InformationNotificationMessage.obtain(userinfo.name + ' 进入聊天室');
                //joinInfo.extra = JSON.stringify({ name: userinfo.name.toString() });

                RongIMLib.RongIMClient.getInstance().sendMessage(4, roomId, joinInfo, {
                    onSuccess: function (retMessage) {
                    },
                    onError: function (error) {
                    }
                });

                //退出聊天室
                RongIMLib.RongIMClient.getInstance().quitChatRoom(preRoomId, {
                    onSuccess: function () {
                        preRoomId = currentRoomId;
                    },
                    onError: function (error) {
                        // 退出聊天室失败。
                    }
                });

                //读取历史消息
                var hisMess = store.get("chatRoomMess_" + roomId);
                if (hisMess) {
                    if (hisMess.length - 100 > 0) {
                        hisMess.splice(0, hisMess.length - 100);
                        store.set("chatRoomMess_" + roomId, hisMess);
                    }

                    var messTime = 0;
                    for (var index in hisMess) {
                        var sendTime = dateDiff(hisMess[index].sentTime);
                        var content = htmlEncode(hisMess[index].content);
                        var userId = hisMess[index].userId;

                        var contentList = "";
                        if (messTime + 60000 < hisMess[index].sentTime) {
                            if (userinfo.userId == userId)
                                contentList = ('<li sendtime="' + hisMess[index].sentTime + '" class="times_txt clearfix">' + sendTime + '</li>' + selfMessTemp).replace(/\$userId\$/g, userId).replace("$userType$", hisMess[index].userType).replace("$messContent$", RongIMLib.RongIMEmoji.emojiToHTML(content));
                            else
                                contentList = ('<li sendtime="' + hisMess[index].sentTime + '" class="times_txt clearfix">' + sendTime + '</li>' + messListTemp).replace(/\$userId\$/g, userId).replace("$userName$", hisMess[index].userName).replace("$userName$", hisMess[index].userName).replace("$userType$", hisMess[index].userType).replace("$messContent$", RongIMLib.RongIMEmoji.emojiToHTML(content));
                        } else {
                            if (userinfo.userId == userId)
                                contentList = selfMessTemp.replace(/\$userId\$/g, userId).replace("$userType$", hisMess[index].userType).replace("$messContent$", RongIMLib.RongIMEmoji.emojiToHTML(content));
                            else
                                contentList = messListTemp.replace(/\$userId\$/g, userId).replace("$userName$", hisMess[index].userName).replace("$userName$", hisMess[index].userName).replace("$userType$", hisMess[index].userType).replace("$messContent$", RongIMLib.RongIMEmoji.emojiToHTML(content));
                        }

                        $("#messContentList").append(contentList);

                        if (messTime + 60000 < hisMess[index].sentTime) {
                            messTime = hisMess[index].sentTime;
                        }
                    }
                    scrollToBottom();
                }
            },
            onError: function (error) {
                console.log('加入聊天室' + roomId + '失败');
            }
        });
    },

    //发送信息
    this.SendMsg = function (targetId) {
        if (userinfo.userId.indexOf('guest') > -1) {
            if (USER_ID == 0) {
                return;
            } else {
                window.location.reload();
            }
        }

        if (dict.items(targetId) == null) {
            msg("该聊天室不存在或者已被管理员解散", 1);
            return;
        }

        var content = $.trim($("#txtMessContent").val());
        if (content.length <= 0) {
            $("#txtMessContent").val('');
            msg("请输入聊天内容", 1);
            return;
        }

        var con = RongIMLib.RongIMEmoji.symbolToEmoji(content);
        var msgContent = RongIMLib.TextMessage.obtain(con);
        msgContent.extra = JSON.stringify({ name: userinfo.name.toString(), icon: userinfo.portraitUri.toString() });

        RongIMLib.RongIMClient.getInstance().sendMessage(4, targetId, msgContent, {
            onSuccess: function (retMessage) {
                //var sendTime = dateDiff(retMessage.sentTime);
                //lastMessTime = retMessage.sentTime; //改为下面的localStorage存储
                try {
                    window.localStorage.setItem("IM_lastMessTime", retMessage.sentTime);
                } catch (e) { }

                var mess = htmlEncode(retMessage.content.content);

                var icon = 'investors';
                switch (userinfo.portraitUri) {
                    case '2': {
                        icon = 'investors'; break;
                    }
                    case '1': {
                        icon = 'traders'; break;
                    }
                }

                var content = selfMessTemp.replace(/\$userId\$/g, retMessage.senderUserId).replace("$userType$", icon).replace("$messContent$", RongIMLib.RongIMEmoji.emojiToHTML(mess));

                $("#messContentList").append(content);

                scrollToBottom();

                $.ajax({
                    type: 'POST',
                    url: '/Social/ChatRoom/UpdateChatroomState',
                    data: { roomId: targetId, messContent: userinfo.name + ":" + RongIMLib.RongIMEmoji.emojiToSymbol(mess.substring(0, 20)), messTime: retMessage.sentTime }
                });

                $("#txtMessContent").val(''); //清空输入框内容

                saveHistoryMessages(retMessage, icon, userinfo.name);
            },
            onError: function (error) {
                var info = '';
                switch (error) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误';
                        break;
                    case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                        info = '在黑名单中，无法向对方发送消息';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                        info = '不在讨论组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_GROUP:
                        info = '不在群组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                        info = '不在聊天室中';
                        break;
                    default:
                        info = error;
                        break;
                }

                if (info == 23408) {
                    msg("您已被管理员禁言", 1);
                } else {
                    msg("发送失败：" + info, 1);
                }
            }
        });
    },

    //加载聊天室列表
    this.LoadList = function (roomId) {
        $.ajax({
            type: 'POST',
            url: '/Social/ChatRoom/LoadChatRoom',
            data: { Ids: dict.keys() },
            traditional: true
        }).done(function (rs) {
            var total = rs.length;
            var allList = "", myArray = [], myList = "", ids = "";
            myAtt.clear();

            if ($("#chatNewMsg").length > 0 && $("#chatNewMsg").parent().hasClass("active") == false) $("#chatNewMsg").removeClass("new_msg_point");

            for (var n = 0; n < total; n++) {
                if (roomId == null && n == 0 && currentRoomId == "-1") {
                    chatRoom.Join(rs[0].Id.toString());
                }

                //默认关注第一个聊天室
                if (dict.count() <= 0) {
                    AttentServer(rs[0].Id.toString(), true);
                }

                dict.add(rs[n].Id, { name: rs[n].Name, intro: rs[n].Intro });
                ids += rs[n].Id + ',';

                if (rs[n].IsAtt == true) {
                    myAtt.add(rs[n].Id, { isSelf: false });
                }

                if (rs[n].LastMessageContent.length == 0) rs[n].LastMessageContent = dict.items(rs[n].Id).intro;

                allList += roomListTemp.replace("$domId$", "roomList" + rs[n].Id)
                    .replace("$roomId$", "'" + rs[n].Id + "'")
                    .replace("$nums$", rs[n].UserCount)
                    .replace(/\$name\$/g, dict.items(rs[n].Id).name)
                    .replace("$intro$", rs[n].LastMessageContent)
                    .replace("$title$", dict.items(rs[n].Id).name)
                    .replace("$author$", "创建者：" + rs[n].NickName)
                    .replace("$desc$", "简介：" + dict.items(rs[n].Id).intro);

                if (currentRoomId == rs[n].Id) {
                    allList = allList.replace('$class$', 'class="active"');
                } else {
                    if (rs[n].HasNewMess == true) {
                        allList = allList.replace('$class$', 'class="new_msg"');
                    } else {
                        allList = allList.replace('$class$', '');
                    }
                }

                if (rs[n].UserId == userinfo.userId) {
                    myAtt.add(rs[n].Id, { isSelf: true });

                    myArray.push(rs[n]);
                }

                if (rs[n].HasNewMess == true) {
                    try {
                        lastMessTime = window.localStorage.getItem("IM_lastMessTime");
                    } catch (e) { }

                    if (lastMessTime != rs[n].LastMessageTime) {
                        if ($("#chatNewMsg").length > 0 && $("#chatNewMsg").parent().hasClass("active") == false) {
                            $("#chatNewMsg").addClass("new_msg_point");
                        }
                    }
                }
            }

            if (myArray.length > 0) {
                myArray.sort(function (a, b) {
                    return b.CreateTime.replace("/Date(", "").replace(")/", "") - a.CreateTime.replace("/Date(", "").replace(")/", "");
                });
                for (var n = 0; n < myArray.length ; n++) {
                    myList += roomListTemp.replace("$domId$", "selfRoomList" + myArray[n].Id)
                        .replace("$roomId$", "'" + myArray[n].Id + "'")
                        .replace("$nums$", myArray[n].UserCount)
                        .replace("$name$", dict.items(myArray[n].Id).name)
                        .replace("$intro$", myArray[n].LastMessageContent);

                    if (currentRoomId == myArray[n].Id) {
                        myList = myList.replace('$class$', 'class="active"');
                    } else {
                        myList = myList.replace('$class$', '');
                    }
                }
            }

            if (listType == 1) {
                //完整模式
                $("#allChatList").html(allList);

                $("#allChatroomNum").text(total);

                if (myList.length > 0) {
                    $("#allMyChat").show();
                    $("#myGuide").hide();
                    $("#allMyChat").html(myList);
                } else {
                    $("#allMyChat").hide();
                    $("#myGuide").show();
                }
            } else {
                //精简模式
                $("#selChatRoom").html(allList);
                $("#selChatRoom").val(currentRoomId);
            }

            if (roomId != null && dict.items(roomId) != null) chatRoom.Join(roomId.toString());

            if ((',' + ids).indexOf(',' + currentRoomId + ',') < 0) currentRoomId = "-1";
        });
    },

    //创建聊天室
    this.Create = function () {
        var name = $.trim($("#iptRoomName").val());
        var intro = $.trim($("#iptRoomIntro").val());
        if (name.length <= 0) {
            msg("请输入聊天室名称", 1);
            return;
        }
        if (intro.length <= 0) {
            msg("请输入聊天室简介", 1);
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/Social/ChatRoom/CreateChatroom',
            data: { roomName: htmlEncode(name), roomIntro: htmlEncode(intro) }
        }).done(function (rs) {
            if (rs.rs > 0) {
                msg(rs.mess, 1);

                $("#iptRoomName").val('');
                $("#iptRoomIntro").val('');
                $('.dialog_public').hide();
            }
            else
                msg(rs.mess, 1);
        });
    },

    //关注/取消关注
    this.Attent = function () {
        if (currentRoomId != '-1') {
            AttentServer(currentRoomId, false)
        }
    }

};

//load
$(function () {
    //聊天按回车快速发送
    $("#txtMessContent").keydown(function (evt) {
        evt = (evt) ? evt : ((window.event) ? window.event : "")
        var key = evt.keyCode ? evt.keyCode : evt.which;
        if (key == 13) {
            $("#btnSendMess").click();
        }
    });

    //创建聊天室
    $("#btnCreateRoom").click(function () {
        requiredLogin(chatRoom.Create());

        //if (userinfo.userId.indexOf('guest') > -1) {
        //    msg("请登录后再操作", 1);
        //    return;
        //}

    });
});

//mock hashtable
function dictionary() {
    this._hash = {};
    this._count = 0;
    this.add = function (key, value) {
        if (this._hash.hasOwnProperty(key)) return false;
        else {
            this._hash[key] = value;
            this._count++;
            return true;
        }
    }
    this.remove = function (key) {
        delete this._hash[key];
        this._count--;
    }
    this.count = function () {
        return this._count;
    }
    this.items = function (key) {
        if (this.contains(key)) return this._hash[key];
    }
    this.contains = function (key) {
        return this._hash.hasOwnProperty(key);
    }
    this.clear = function () {
        this._hash = {};
        this._count = 0;
    }
    this.keys = function () {
        var temp = [];
        $.each(this._hash, function (k) { temp.push(k); })
        return temp;
    }
};

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

function dateDiff(hisTime, nowTime) {
    var now = nowTime ? nowTime : new Date().getTime(),
        diffValue = now - hisTime,
        result = '',
        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        halfamonth = day * 15,
        month = day * 30,
        year = month * 12,

        _year = diffValue / year,
        _month = diffValue / month,
        _week = diffValue / (7 * day),
        _day = diffValue / day,
        _hour = diffValue / hour,
        _min = diffValue / minute;

    if (_min < 1) result = "刚刚";
    else if (_min < 60) result = parseInt(_min) + "分钟前";
        //else result = new Date(hisTime).Format("hh:mm");
    else if (_hour < 24) result = parseInt(_hour) + "小时前";
    else result = new Date(hisTime).Format("MM/dd hh:mm");

    return result;
}

function htmlEncode(value) {
    return $('<HtmlConver/>').text(value).html();
}

function htmlDecode(value) {
    return $('<HtmlConver/>').html(value).text();
}

//聊天内容自动滚动到底部
function scrollToBottom() {
    try {
        var messH = $("#messContentList").height();
        $("#messContentScroll").animate({ scrollTop: messH },300);
    } catch (e) { }
}

//更新我的关注
function UpdateMyAttent(Id, preId) {
    $.ajax({
        type: 'POST',
        url: '/Social/ChatRoom/UpdateMyAttent',
        data: { roomId: Id, preId: preId }
    });
}

//获取聊天室在线人数
function getChatRoomOnline(roomId) {

    try {
        var onlineNums = $("#allChatList li[class=active] span[class=times]").text();
        $("#chatRoomUserCount").text(onlineNums);
    } catch (e) { }

    ////获取当前聊天室信息
    //RongIMLib.RongIMClient.getInstance().getChatRoomInfo(roomId, 0, 2, {
    //    onSuccess: function (chatRoom) {
    //        //人数
    //        $("#chatRoomUserCount").text(chatRoom.userTotalNums * 8);
    //    },
    //    onError: function (error) {
    //        // 获取聊天室信息失败。
    //    }
    //});
}

//关注、取消关注聊天室
function AttentTo() {
    requiredLogin(chatRoom.Attent);
}

function AttentServer(chatRoomId, flag) {
    $.ajax({
        type: 'POST',
        url: '/Social/ChatRoom/AttentChatroom',
        data: { roomId: chatRoomId, onlyAtt: flag }
    }).done(function (rs) {
        if (rs) {
            if ($("#attRoomOper").length > 0) {
                if (flag)
                    $("#attRoomOper").text("取消关注").addClass('cancelfl');
                else
                    $("#attRoomOper").text() == "关注" ? $("#attRoomOper").text("取消关注").addClass('cancelfl') : $("#attRoomOper").text("关注").removeClass('cancelfl');
            }
            //msg("操作成功", 1);
        }
        //else msg("操作失败", 1);
    });
}

//TAB切换到聊天室时
function updateNewMsg() {
    $("#chatNewMsg").removeClass("new_msg_point");
    if (currentRoomId != "-1") UpdateMyAttent(currentRoomId, "-1");

    $("#chatRoomTAB").show();
    if ($("#joinInfoMsg").is(":visible")) {
        $("#joinInfoMsg").fadeOut(2000);
    }
    scrollToBottom();
}

//用户切换聊天室（简单列表模式）
function ChatRoomChange() {
    var roomId = $("#selChatRoom").val();
    chatRoom.Join(roomId.toString());
}

function newLine(content) {
    return content.replace(/(.{20})/g, '$1\n');
}

function simpleList() {
    $("#selChatRoom").attr("title", $("#selChatRoom  option:selected").attr("nameShow"));
}

//mock list
function List() {
    this.value = [];

    /* 添加 */
    this.add = function (obj) {
        return this.value.push(obj);
    };

    /* 大小 */
    this.size = function () {
        return this.value.length;
    };

    /* 返回指定索引的值 */
    this.get = function (index) {
        return this.value[index];
    };

    /* 删除指定索引的值 */
    this.remove = function (index) {
        this.value.splice(index, 1);
        return this.value;
    };

    /* 删除全部值 */
    this.removeAll = function () {
        return this.value = [];
    };

    /* 是否包含某个对象 */
    this.constains = function (obj) {
        for (var i in this.value) {
            if (obj == this.value[i]) {
                return true;
            } else {
                continue;
            }
        }
        return false;
    };
}

//历史消息存储
function historyMessagesStore() {
    this.get = function (key) {
        try {
            var rs = localStorage.getItem(key);
            return JSON.parse(rs);
        } catch (e) {
            return null;
        }
    };
    this.set = function (key, value) {
        try {
            var seria = JSON.stringify(value);
            localStorage.setItem(key, seria);
        } catch (e) { }
    }
}

//保存历史消息
function saveHistoryMessages(message, userT, userN) {
    var hisList = store.get("chatRoomMess_" + message.targetId);
    if (hisList == null || hisList.length <= 0) hisList = [];
    hisList.push({ userId: message.senderUserId, sentTime: message.sentTime, content: message.content.content, userType: userT, userName: userN });
    store.set("chatRoomMess_" + message.targetId, hisList);
}