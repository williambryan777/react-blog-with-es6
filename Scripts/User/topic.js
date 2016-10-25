
jQuery(function () {
    var $ = jQuery,
        $uploadImgBox = $("#uploadImgBox"),
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,

        // 缩略图大小
        thumbnailWidth = 80 * ratio,
        thumbnailHeight = 80 * ratio,

        // Web Uploader实例
        uploader;
    // 初始化Web Uploader
    uploader = WebUploader.create({

        // 自动上传。
        auto: true,

        // swf文件路径
        swf: '~/Scripts/Crop/js/Uploader.swf',

        // 文件数量限制
        fileNumLimit: 1,
        // 文件接收服务端。
        server: '/file/UploadFile',

        duplicate: false,
        pick: {
            multiple: false,
            id:'#uploadImg'
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
    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        $uploadImgBox.children().remove();
        var $img = $('<img id="' + file.id + '">');

        // 创建缩略图
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);
        $uploadImgBox.append($img);
    });


    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file) {
        uploader.removeFile(file);
    });

    // 文件上传失败，现实上传出错。
    uploader.on('uploadError', function (file) {
       
    });

});