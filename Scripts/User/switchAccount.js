/*
个人后台的账号切换。
*/

//初始化账号切换
$(function () {
    getUserAccountAudit();

    //用户选择用户账号下拉
    $('#switchAccount')
        .click(function () {
            $(this).addClass('active');
        });

    if ($('#selAccount').length > 0) {
        $('#selAccount li')
            .click(function (e) {
                e.stopPropagation();
                confirmBox('是否确定要切换交易账号？', onConfrimSwitch, $(this));
                //e.stopPropagation();
                //$(this)
                //    .parents('.js_choice_account')
                //    .removeClass('active')
                //    .find('.choice_account_value')
                //    .text($(this).text());
            });
    }

    function onConfrimSwitch(e) {
        //e.stopPropagation();
        //e.parents('.js_choice_account')
        //.removeClass('active')
        //.find('.choice_account_value')
        //.html(e.html());
        //切换账号
        onSwitchAccount(e.attr("aid"));
    }

    $(document)
        .bind("click",
            function (e) {
                var target = $(e.target);
                if (target.closest(".js_choice_account").length == 0) {
                    $("#switchAccount").removeClass('active');
                }
            });
});

function onSwitchAccount(aid)
{
    $.post('/Home/SetPrimaryAccount', "aid=" + aid, function (data) {
        if (data.code != 0) {
            msg("交易账号切换失败。");
        }
        else {
            try {
                localStorage.setItem("U_SwitchAccount", "1")
            } catch (e) { }

            window.location.href = "/PortalIndex";
            //window.location.reload();
        }
    });
}

function getUserAccountAudit() {
    $.post('/Home/GetAuditNum', function (data) {
        if (data.code > 0) {
            $("#divAccountAudit").show();
            $("#divAccountAudit a").html("您有" + data.code + "个账号正在申请中");
        }
    });
}