// QQ表情插件
(function($){  
	$.fn.qqFace = function(options){
		var defaults = {
			id : 'facebox',
			path: '~/Scripts/User/face/',
			assign : 'content',
			tip : 'em_'
		};
		var option = $.extend(defaults, options);
	    //var assign = $('#'+option.assign);
		var faceArray = ['啊', '哎呀', '唉', '闭嘴', '憋嘴', '不高兴', '不屑', '沉思', '吃惊', '大哭', '大笑', '飞吻', '愤怒', '尴尬', '鬼脸', '哈哈', '害羞', '好吃', '嘿嘿', '哼哼', '花心', '激动', '紧张', '惊悚', '惊讶', '开心', '苦逼', '困惑', '困倦', '雷到', '冷汗', '难过', '难受', '哦', '切', '亲', '亲亲', '亲一口', '傻笑', '生病', '生气', '失望', '帅气', '睡觉', '天使的笑', '偷偷笑', '吐舌头', '微笑', '我汗', '我晕', '无语', '嘻嘻', '羞涩', '咦', '眨眼', '恶魔', '幽灵', '心', '心碎', '听不下去', '没眼看', '好臭', '拜托', '鄙视', '鼓掌', '好', '挥手', '强壮', '拳头', '上面', '食指', '手势', '下面', '耶', '不要', '眼睛', '兔女郎', '一坨屎', '困', '闪电', '火焰', '干杯', '咖啡', '炸弹', '爆炸', '危险', '心情', '对', '错', '问号', '感叹号', '放大镜', '男孩', '女孩', '兔子', '乌龟', '小狗', '熊', '熊猫', '猪鼻子', '猪头', '中国', '德国', '俄罗斯', '法国', '韩国', '美国', '日本', '西班牙', '意大利', '英国', '英镑', '日元', '欧元', '美金', '信用卡', '美金符号', '钱', '美元大涨', '老虎机', '空', '满分', '趋势', '骰子', '图表', '涨', '跌', '电脑', 'top', 'iPhone', '下降', '上涨', '上升', 'up', 'ok', 'cool', '12点', '9点', '6点', '3点', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		var id = option.id;
		var path = option.path;
		path = '../../../Scripts/User/face/';
		var tip = option.tip;
		var qqPosition = option.qqPosition;
/*		if(assign.length<=0){
			alert('缺少表情赋值对象。');
			return false;
		}*/
	$(this).each(function(i) {
	    var styleName = 'facebox';
	    var imgPositionUp = '';
	    var imgPositionDown = '';
	    if (qqPosition === 'up') {
	        styleName = 'faceboxUp';
	        imgPositionDown = '<img src="/Themes/DefaultClean/images/box-cn-down.png" class="box-cn-arrow" style="margin-bottom:-9px;">';
	    } else {
	        imgPositionUp = '<img src="/Themes/DefaultClean/images/box-cn-arrow.png" class="box-cn-arrow">';
	    }
	    var assign_id = $(this).attr("data-id");
		var assign = $('#' + option.assign + assign_id);
		$(this).click(function(e){
		    var strFace, labFace;
		 
			if($('#'+id).length<=0){
			    strFace = '<div id="' + id + '" class="' + styleName + '">' + imgPositionUp + '<div class="box-content facebox-box-content"><div class="facebox-p-t"><a href="javascript:void(0);"><i class="icon i-close" style="float:right;"></i></a></div><div class="nui-scroll facebox-p-t1">' +
						'<table class="face_table" cellspacing="0" cellpadding="0"><tr>';
			    for (var i = 1; i <= faceArray.length; i++) {
			        labFace = '[' + faceArray[i - 1] + ']';
					strFace += '<td><img src="' + path + faceArray[i-1] + '.gif" onclick="$(\'#' + option.assign + assign_id + '\').insertAtCaret(\'' + labFace + '\');" /></td>';
					if( i % 15 == 0 ) strFace += '</tr><tr>';
				}
			    strFace += '</tr></table></div>' + imgPositionDown + '</div>';
			}
				/*strFace = '<div id="'+id+'" style="position:absolute;display:none;z-index:1000;background-color:white;padding:10px;border:1px solid #ccc" class="qqFace">' +
							  '<table border="1" style="border:1px solid #ccc" cellspacing="0" cellpadding="0"><tr>';
				for(var i=1; i<=75; i++){
					labFace = '['+tip+i+']';
					strFace += '<td><img src="'+path+i+'.gif" onclick="$(\'#'+option.assign+assign_id+'\').insertAtCaret(\'' + labFace + '\');" /></td>';
					if( i % 15 == 0 ) strFace += '</tr><tr>';
				}
				strFace += '</tr></table></div>';
			}*/
			if ($.browser.webkit) {
			    $(".facebox-box-content").css('width', '387px');
			   // $(".facebox-p-t1").css('height', '136px');
			} else {
			    $(".facebox-box-content").css('width', '395px');
			    $(".facebox-p-t1").css('height', '140px');
			}
			$(this).parent().append(strFace);
			var offset = $(this).position();
			var top = offset.top + $(this).outerHeight();
			if (qqPosition != 'up') {
			    $('#' + id).css('top', top);
			}
			$('#'+id).css('left',offset.left);
			$('#' + id).show();
			$("#i-picture-box").hide();
			$("#i-picture-box-send").hide();
			$("div[id*='i-user-box']").hide();
			$("div[id*='hot-user-box']").hide();
			e.stopPropagation();
			var nicesx = $(".nui-scroll").niceScroll({ touchbehavior: false, cursorcolor: "#a3a6af", cursoropacitymax: 0.6, cursorwidth: 8, horizrailenabled: false });
		});
});
		$(document).click(function(){
			$('#'+id).hide();
			$('#'+id).remove();
		});
	};
})(jQuery);

jQuery.extend({ 
unselectContents: function(){ 
	if(window.getSelection) 
		window.getSelection().removeAllRanges(); 
	else if(document.selection) 
		document.selection.empty(); 
	} 
}); 
jQuery.fn.extend({ 
	selectContents: function(){ 
		$(this).each(function(i){ 
			var node = this; 
			var selection, range, doc, win; 
			if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined'){ 
				range = doc.createRange(); 
				range.selectNode(node); 
				if(i == 0){ 
					selection.removeAllRanges(); 
				} 
				selection.addRange(range); 
			} else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())){ 
				range.moveToElementText(node); 
				range.select(); 
			} 
		}); 
	}, 

	setCaret: function(){ 
		if(!$.browser.msie) return; 
		var initSetCaret = function(){ 
			var textObj = $(this).get(0); 
			textObj.caretPos = document.selection.createRange().duplicate(); 
		}; 
		$(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret); 
	}, 

	insertAtCaret: function (textFeildValue) {
	    var textObj = $(this).get(0);
	  
	    if ($(textObj).val().length + textFeildValue.length > 140) {
	        return;
	    }
		var text = '';
		if (document.all && textObj.createTextRange && textObj.caretPos) {
			var caretPos=textObj.caretPos; 
			caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ? 
			textFeildValue+'' : textFeildValue;
		} else if (textObj.setSelectionRange) {
		    if ($.browser.version === '9.0') {
		        rangeStart = textObj.value.length;
		        rangeEnd = textObj.value.length;
		    } else {
		        rangeStart = textObj.selectionStart;
		        rangeEnd = textObj.selectionEnd;
		    }
			var tempStr1=textObj.value.substring(0,rangeStart); 
			var tempStr2=textObj.value.substring(rangeEnd); 
			textObj.value=tempStr1+textFeildValue+tempStr2; 
			textObj.focus(); 
			var len = textFeildValue.length;
			textObj.setSelectionRange(rangeStart + len, rangeStart + len);
			//textObj.blur(); 
		}else{
		    //$(textObj) 
		    text = textFeildValue;
			//text = text.replace(/\</g,'&lt;');
			//text = text.replace(/\>/g,'&gt;');
			//text = text.replace(/\n/g,'<br/>');
			//text = text.replace(/\[em_([0-9]*)\]/g, '<img src="/Scripts/User/face/$1.gif" border="0" />');
			$(textObj).append(text);
		}

        //供Angular模型数据双向绑定更新使用
		$(textObj).triggerHandler('change');
	} 
});