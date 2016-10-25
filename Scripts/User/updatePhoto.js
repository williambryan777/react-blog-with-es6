
jQuery(function () {
    var $ = jQuery,
        $PhotoBox = $("#PhotoBox"),
        $img,
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,

        // 缩略图大小
        thumbnailWidth = 300 * ratio,
        thumbnailHeight = 300 * ratio,

        // Web Uploader实例
        uploader;
    // 初始化Web Uploader
    uploader = WebUploader.create({

        // 自动上传。
        auto: true,

        // swf文件路径
        swf: '/Scripts/Crop/js/Uploader.swf',

        // 文件数量限制
        fileNumLimit: 1,
        // 文件接收服务端。
        server: '/file/UploadFile',
        fileSingleSizeLimit: 5 * 1024 * 1024,

        duplicate: false,
        pick: {
            multiple: false,
            id: '#updatePhoto'
        },
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.

        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    // 当有文件移除去时候
    //uploader.on('fileDequeued', function (file) {

    //});

    //uploader.on('beforeFileQueued', function (file) {
    //    var max = uploader.options.fileSingleSizeLimit;
    //    if (file.size > max) {
    //        //file.setStatus(WUFile.Status.INVALID, 'exceed_size');
    //        //this.trigger('error', 'F_EXCEED_SIZE', max, file);
    //        msg('图片不能大于5M', 1);
    //        return false;
    //    }
    //});

    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        $PhotoBox.children().remove();
        $img = $('<img id="' + file.id + '">');
        // 创建缩略图
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr('src', src);
            $('.cropped').html('<dl class="mysettings-heada"><dt><div style="border-radius:50%;overflow:hidden;height:80px;"><img src="' + src + '" width="80" height="80"></div></dt><dd>80*80</dd></dl><dl class="mysettings-headb"><dt><div style="border-radius:50%;overflow:hidden;height:50px;"><img src="' + src + '" width="50" height="50"></dt></div><dd>50*50</dd></dl><dl class="mysettings-headc"><dt><div style="border-radius:50%;overflow:hidden;height:30px;"><img src="' + src + '" width="30" height="30"></dt></div><dd>30*30</dd></dl>');
            
        }, thumbnailWidth, thumbnailHeight);
        $PhotoBox.append($img);
    });


    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file) {
        
        uploader.removeFile(file);
    });

    // 文件上传失败，现实上传出错。
    uploader.on('uploadError', function (file) {
        uploader.removeFile(file);
    });

});