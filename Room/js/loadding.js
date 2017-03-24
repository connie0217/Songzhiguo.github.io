/* loading */
/*
    1.加载（面向对象）
      循环所有资源，根据资源类型，加载创建资源，加载文件之后开始播放背景音乐
        loading百分比就是加载资源占总资源的百分比
        资源全部加载完时，百分比为100%，隐藏百分比
        门开始从小变大，文字依次间隔时间透明度由0到1显示
    2.点击门把手
      背景颜色由黑变白，放大2倍
 */
$(function() {
    var PreLoad = function(resource, object) {
        var obj = object || {};//有object就把object赋给obj,没有创建个对象赋给obj
        this.source = resource;//加载资源
        this.count = 0;//
        this.total = resource.length;//加载资源总个数
        this.onload = obj.onload;//
        this.prefix = obj.prefix || "";
        this.init();//调用init
    };
    PreLoad.prototype.init = function() {
        var that = this;
        //遍历加载资源
        that.source.forEach(function(ele) {
            var format = ele.substr(ele.indexOf(".") + 1).toLowerCase();//截取格式
            var path = that.prefix + ele;//文件路径
            switch (format) {
                case "js"://截取格式为js调用PreLoad下的script方法，传入实参path路径
                    that.script.call(that, path);
                    break;
                case "css":
                    that.stylesheet.call(that, path);
                    break;
                case "svg":
                case "jpg":
                case "gif":
                case "png":
                case "jpeg":
                    that.image.call(that, path);
            }
        });
    };
    PreLoad.prototype.image = function(path) {
        var img = document.createElement("img");//创建img
        this.load(img, path);//调用PreLoad下的load方法，传入实参img,path
        img.src = path;
    };
    PreLoad.prototype.stylesheet = function(path) {
        var link = document.createElement("link");
        this.load(link, path);
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = path;
        document.head.appendChild(link);
    };
    PreLoad.prototype.script = function(path) {
        var Script = document.createElement("script");
        this.load(Script, path);
        Script.type = "text/javascript";
        Script.src = path;
        document.head.appendChild(Script);
    };
    PreLoad.prototype.load = function(file, path) {
        var that = this;
        //加载完成
        file.onload = file.onerror = file.onabort = function(file) {
            // 如果有PreLoad下有onload属性就执行onload，传对象实参过去
            that.onload && that.onload({
                count: ++that.count,//当前加载多少个资源文件
                total: that.total,//加载资源总数
                item: path,//加载资源路径
                type: file.type//加载资源类型
            });
        };
    };
    var resources = [ "style/index.css","js/touch.js"];
    var images = [ "images/img/light/bg2_01.jpg", "images/img/light/bg2_02.jpg", "images/img/light/bg2_03.jpg", "images/img/light/bg2_04.jpg", "images/img/light/bg2_05.jpg", "images/img/dark/bg2_01.jpg", "images/img/dark/bg2_02.jpg", "images/img/dark/bg2_03.jpg", "images/img/dark/bg2_04.jpg", "images/img/dark/bg2_05.jpg", "images/img/flash/img_01.png", "images/img/flash/img_02.png", "images/img/flash/img_03.png", "images/img/flash/img_04.png", "images/img/key/key01.png", "images/img/key/key01_2.png", "images/img/key/key02.png", "images/img/key/key02_2.png", "images/img/key/key03.png", "images/img/key/key04.png", "images/img/key/key04_2.png", "images/img/key/key05.png", "images/img/key/key06.png", "images/img/key/key07.png", "images/img/key/key08.png", "images/img/key/key09.png", "images/img/loading/loading01.png", "images/img/loading/loading02.png" ];
    resources = resources.concat(images);
    new PreLoad(resources, {
        onload: function(load) {
            var count = load.count;//当前加载多少个资源文件
            var total = load.total;//加载资源总数
            var percent = Math.ceil(100 * count / total);//当前加载占总加载资源的百分比
            $("#percent").html(percent + "%");//设置$("#percent")的内容
            setTimeout(function() {//设置延迟定时器，500ms后执行
                $("#audioBg")[0].play();//开始播放当前的音频
                // $("#jsBgBox").removeClass("dark");
                if (count == total) {//加载资源完毕
                    var $load = $("#loading");//获取loading
                    $("#percent").hide();//加载百分比隐藏
                    $("#loading .animate-item").addClass("loaded");//class属性添加loaded
                    setTimeout(function() {//设置延迟定时器，2500ms后执行
                        $load.find(".text").addClass("show");//class属性添加show,text显示
                        setTimeout(function() {//设置延迟定时器，2500ms后执行
                            $load.find(".tips").addClass("show");//class属性添加show,tips显示
                            //添加点击事件
                            $load.find(".animate-item").on("tap", function() {
                                $($load).addClass("complete");//添加complete，背景颜色由黑变白，放大2倍
                                setTimeout(function() {
                                    $load.remove();//删除$load节点
                                }, 1e3);
                            });
                        }, 2500);
                    }, 2500);
                }
            }, 500);
        }
    });
});
