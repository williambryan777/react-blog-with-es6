
$(function () {
    GetAttAndFansCount(0, function (data) {
        $("#MyAttention_Menu").text('（' + data.attcount + '）');
        $("#MyFans_Menu").text('（' + data.fancount + '）');
    });
});



