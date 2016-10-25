var data6 = {
        'title': '当前获利总额来源',
        'name': followName.name,
        'data': followName.data
    }
    reBuildData(data6);

    var hei = data6.name.length * 25;
    $("#container6").css('height', hei + 'px');
    creatChart6("container6", data6);
    var selectedTrader = 0;

    var li_list = $(".followDataList>li");
    li_list.each(function (index,e) {
        $(e).attr('data-index', index);
    });
    var li_count = $(".followDataList>li").length;//数据条数
    var up_top = 0;//top值
    var count = 0;//滚动次数
    var currentIndex;
    var selectIndex;
    var currentEndIndex;
    var isInit = false;//是否显示概览
    $(".down_aa").click(function () {
        if (li_count <= 4) return;
        li_list.each(function (index, e) {
            if ($(e).children('div').attr('class').indexOf('active')>=0) {
                selectIndex = parseInt($(e).attr('data-index'));
            }
        });
        if (li_count - count === 4) {
            $(this).children().css('background-position', '0 -50px');
            return;
        } else {
            up_top = up_top - 120;
            count++;
            currentIndex = parseInt($(li_list[count]).attr('data-index'));
            if (selectIndex < currentIndex) {
                selectIndex = currentIndex;
                $(li_list[selectIndex]).siblings('li').children('div').removeClass('active');
                $(li_list[selectIndex]).children('div').addClass('active');
                onTraderChanged($(li_list[selectIndex]).attr("trader-Id"));
            }
        }
        $(".up_aa").children().removeAttr('style');
        $(".followDataList").animate({ top: up_top });
    });
    $(".up_aa").click(function () {
        if (li_count <= 4) return;
        li_list.each(function (index, e) {
            if ($(e).children('div').attr('class').indexOf('active') >= 0) {
                selectIndex = parseInt($(e).attr('data-index'));
            }
        });
        if (count === 0) {
            $(this).children().css('background-position', '0 -50px');
            return;
        } else {
            up_top = up_top + 120;
            count--;
            currentIndex = parseInt($(li_list[count + 3]).attr('data-index'));
            if (selectIndex > currentIndex) {
                selectIndex = currentIndex;
                $(li_list[selectIndex]).siblings('li').children('div').removeClass('active');
                $(li_list[selectIndex]).children('div').addClass('active');
                onTraderChanged($(li_list[selectIndex]).attr("trader-Id"));
            }
        }
        $(".down_aa").children().removeAttr('style');
        $(".followDataList").animate({ top: up_top });
    });
   
    $(".followDataList>li").click(function () {
        $(this).siblings('li').children("div").removeClass('active');
        $(this).children("div").addClass('active');
        onTraderChanged($(this).attr("trader-Id"));
    });
    //切换tab显示不同块
    $("#tab_select").find('a').click(function () {
        loadChart();
    });

    //当前获利总额来源 报表数据格式
    var data3 = {
        'title': '总收益',
        'time': profitsObj.time,
        'data': profitsObj.data
    }
    //日交易手数 数据格式
    var data7 = {
        'title': '日交易手数',
        'time': tradesObj.time,
        'data': tradesObj.data
    }
    //交易总笔数 数据格式
    var data2 = {
        'title': '交易总笔数',
        'data': [['盈利笔数', winTrades],['亏损笔数', loseTrades]]
    }
    function loadChart() {
        //当前获利总额来源 报表生成方法
        creatChart3("container3", data3,3);
        //日交易手数 图表成成
        creatChart7("container7", data7);
        //交易总笔数 图表成成
        creatChart2("container2", data2);
    }
//切换当前选择的交易员
    function onTraderChanged(id) {
        if (!isInit) {
            isInit = true;
            $(".allFollow_box").removeClass("active");
            $(".allfollow_databox").hide();
            $(".personalfollow_databox").show();
        }
        $.post("/Report/Trader/GetCustomerFollowReport",
            { 'customer': USER_ID + '_' + userAccountIndex, 'trader': id },
            function (data) {
                createTraderChart(data);
                createFollowData(data);
                $("#PText").html('跟随' + data.followSetting.NickName + '的总收益');
            });
        refreshOrderList();
    }

//点击所有跟随交易切换
    $(".allFollow_box").click(function () {
        isInit = false;
        $(this).addClass("active");
        $(".followDataList>li>div").removeClass('active');
        $(".allfollow_databox").show();
        $(".personalfollow_databox").hide();

        refreshOrderList();
    });

    function refreshOrderList()
    {
        var obj = $(".followDataList>li>div.active").parent();
        if (obj != undefined && obj != null && $(obj).attr("trader-id") != undefined) {
            traderId = $(obj).attr("trader-id");
        }
        else {
            traderId = "";
        }
        _IsInitPaging = true;
        loadOpenedTable(0);
        loadClosedTable(0);
    }

    function createTraderChart(obj)
    {
        var data3 = {
            'title': '',
            'time': obj.report.time,
            'data': obj.report.data
        }
        creatChart3("container-report", data3);
    }
    function createFollowData(obj)
    {
        $("#follow_settings_container").html(followSettings(obj));
        $("#follow_profit_container").html(followProfit(obj));
        getUserAssociate();
    }