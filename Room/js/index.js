/*
1.点击提示弹窗层，弹窗层消失
2.点击房间内的物品
    开灯状态
      物品门：
        拿到线索
          弹出会话框
            点击会话框，会话框消失,进入输入密码界面
              输入密码
                (1).输入四个
                    密码错误
                      抖动效果
                      输入超过四个，第五个为第一个
                    密码正确
                      进入完成页面
                        文字依次间隔时间透明度由0到1，然后消失，显示最后一个页面
                (2).取消
                    输入密码页面隐藏
        未拿到线索
            弹出会话框
              点击会话框，会话框消失
              
      物品：台灯、床头灯、房间灯
        切换灯的状态
        
      物品：收音机、抽屉、枕头、衣柜..
        弹出会话框
          点击会话框，会话框消失
          
      物品：电脑、手机、存钱罐
        未拿到线索
          弹出会话框
            点击线索
              点击查看
                拿到线索
                  点击会话框，会话框消失
        拿到线索
          弹出会话框
            点击会话框，会话框消失
      
    关灯状态
      弹出会话框
        点击会话框，会话框消失
        
  3.点击右上角提示
      弹出会话框
        点击会话框，会话框消失
 */
$(function() {
    var $bgbox = $("#jsBgBox");//背景盒子
    var dialogFlag = true;//会话框开关,点击时为true才能消失
    var key1 = 0, key2 = 0, key3 = 0, key4 = 0;//四把钥匙
    var $dialog = $("#dialogBox");//对话框
    var $dialogKey = $dialog.find(".dialog-key");//对话框线索
    var $dialogTips = $(".dialog-tips");//对话框提示层
    var $dialogTitle = $dialogTips.find("h3");//data-title
    var $dialogDisc = $dialogTips.find("p");//data-disc
    var lightIsOpened = "true";//true为开灯
    var isFinished = false;//完成线索false未完成
    var isFromDoor = false;//输入密码开关
    var addShakeEvent = function() {
        var ShakeEvent = new Shake({
            threshold: 15,
            timeout: 1e3
        });
        ShakeEvent.start();
        window.addEventListener("shake", shakeEventDidOccur, false);
    };
    var removeShakeEvent = function() {
        window.removeEventListener("shake", shakeEventDidOccur, false);
    };
    //点击房间内的物品
    $(".item").on("tap", function(){
        // $dialog.attr('class','item show');
        var $this = $(this);//点击的物品
        //获取点击$this的属性值
        var type = $this.attr("data-type");
        var title = $this.attr("data-title");
        var disc = $this.attr("data-disc");
        var isKey = $this.attr("data-iskey");
        var img = $this.attr("data-img");
        //点击$this的type不为2，$this属性添加after
        if (type != 2){
            $(this).addClass("after");
        }
        isFromDoor = false;
        //添加延迟定时器，点击$this500毫秒后执行
        setTimeout(function(){
            if (type == 1) {//点击$this的自定义属性type为1
                if (!lightIsOpened) {//!lightIsOpened为关灯状态下
                    showDialog("太暗了，看不太清楚", "打开灯来吧", "05", "false");//调用showDialog
                } else {//开灯状态下
                    if ($this.attr("id") == "door" && isFinished == true) {
                        isFromDoor = true;
                        showResult();
                    } else {
                        showDialog(title, disc, img, isKey);
                    }
                }
            } else if (type == 2) {//点击$this的type为2
                if (!lightIsOpened) {//关灯状态
                    showDialog("太暗了，看不太清楚", "打开灯来吧", "05", "false");
                } else {
                    return false;
                }
            } else if (type == 3) {//点击$this的type为3
                var Tips = $this.attr("data-tips");//获取点击$this的data-tips属性值
                if (!lightIsOpened) {//关灯状态
                    showDialog("太暗了，看不太清楚", "打开灯来吧", "05", "false");
                } else {//开灯状态
                    showDialog(title, disc, img, isKey, Tips);
                }
            } else if (type == 4) {} else if (type == 5) {
                if (!lightIsOpened) {//关灯状态
                    showDialog("太暗了，看不太清楚", "打开灯来吧", "05", "false");
                } else {//开灯状态
                    showDialog(title, disc, img, isKey);
                }
            }
            //播放当前触发事件的背景音乐
            if ($this.attr("id") == "poster") {
                $("#audioPoster")[0].play();
            } else if ($this.attr("id") == "trash") {
                $("#audioTrash")[0].play();
            } else if ($this.attr("id") == "video") {
                $("#audioVideo")[0].play();
            } else if ($this.attr("id") == "light") {
                $("#audioLight")[0].play();
            }
        }, 500);
    });
    //按下开关
    $("#light").on("touchstart", function() {
        $bgbox.toggleClass("dark");//按下开关$bgbox的class属性中没有dark就添加，有就移出dark
        $(".item").toggleClass("hide");//按下开关$(".item")的class属性中没有hide就添加，有就移出hide
        //按下开关改变灯的开关状态，用于辨别是否在开灯状态下点击
        if (lightIsOpened) {
            lightIsOpened = false;
        } else {
            lightIsOpened = true;
            // $bgbox.removeClass("dark");
        }
    });
    var lightAIsOpened = false;//床头灯开关 false为关灯状态
    var lightBIsOpened = false;//台灯开关   false为开灯状态
    //按下房间内的台灯、床头灯
    $(".item").on("touchstart", function() {
        if ($(this).hasClass("light_a")) {//床头灯
            if (lightAIsOpened) {//床头灯开关为true，开灯状态
                lightAIsOpened = false;//改变床头灯开关状态为false
                $(this).removeClass("after");//移出after，关灯
            } else {//床头灯开关为false,关灯状态
                lightAIsOpened = true;//改变床头灯开关状态为true
                $(this).addClass("after");//添加after，开灯
            }
        } else if ($(this).hasClass("light_b")) {//台灯
            if (lightBIsOpened) {//台灯开关状态为true,关灯状态
                lightBIsOpened = false;//改变台灯开关状态
                $(this).removeClass("after");//移出after,开灯
            } else {//台灯开关为false,开灯状态
                lightBIsOpened = true;//改变台灯开关状态为true
                $(this).addClass("after");//移出after,关灯
            }
        }
    });
    //按下提示遮罩移出提示遮罩节点
    $(".page-tips").on("touchstart", function() {
        $(this).remove();
    });
    var showResult = function() {
        var count = key1 + key2 + key3 + key4;//已获得总线索
        var $progress = $(".dialog-progress span");//获得线索
        var title = "", disc = "", img = "";
        $progress.html(count);//改变已获得线索
        if (count == 1) {//获得1条线索
            title = "获得一块“记忆碎片”! ";//设置title
            disc = "上面好像有奇怪的图案</br>好像只是其中一部分";//设置disc
            img = "06";//显示图片序号
            showDialog(title, disc, img, "false");//传入参数
        } else if (count == 2) {
            title = "获得第二块“记忆碎片”！ ";
            disc = "两块碎片叠在一起了！</br>图案还是看不太清";
            img = "07";
            showDialog(title, disc, img, "false");
        } else if (count == 3) {
            title = "获得第三块“记忆碎片”！";
            disc = "把碎片叠到一起</br>看起来是些数字";
            img = "08";
            showDialog(title, disc, img, "false");
        } else if (count == 4) {
            title = "获得最后一块“记忆碎片”！ ";
            disc = "终于完成了！“0325”！</br>快去开门解锁吧！";
            img = "09";
            isFinished = true;//完成线索
            showDialog(title, disc, img, "false");
            $dialog.on("tap", function() {
                if (isFromDoor) {
                    $(".lock-key").addClass("show");//显示输入密码
                }
            });
        }
    };
    var showDialog = function(dTitle, dDisc, dImg, isKey, dTips) {
        $dialog.addClass("show");//会话框显示
        var $mask = $dialog.find(".dialog-mask");//点击查看
        var $audioResult = $("#audioResult")[0];//成功拿到线索音频
        if (dImg !== "none") {//自定义属性data-img ！= "none";
            $dialogKey.removeClass("hide");//删除class属性hide
            $dialogKey.find(".key-img").removeClass().addClass("key-img key-img_" + dImg);
            $dialogKey.find(".key-tips").html(dTips);//改变key-tips的innerHTML内容
        } else {//
            $dialogKey.addClass("hide");//添加class属性hide
        }
        if (isKey == "true"){
            dialogFlag = false;
        } else {
            dialogFlag = true;
        }
        $dialogTitle.html(dTitle);//改变$dialogTitled的innerHTML内容
        $dialogDisc.html(dDisc);//改变$dialogDisc的innerHTML内容
        $(".key-img span").show();//显示需要点击的span
        if (dImg == 1) {//自定义属性dImg为01
            if (dTips == "您已经拿到该线索！") {//已拿到该线索
                dialogFlag = true;
                $(".key-img").addClass("result");//切换拿到线索的图片
                $(".key-img span").hide();//需要点击的线索span隐藏
                $dialogTitle.html("诶，打开里面居然有东西！");//改变$dialogTitle的innerHTML内容
                $dialogDisc.html("");//清空$dialogDisc的innerHTML内容
            } else {//该线索会话框首次显示
                $(".key-img_01 span").on("tap", function() {//点击该线索span
                    $(".key-img_01").addClass("result");//切换拿到线索的图片
                    $(".key-img span").hide();//需要点击的线索span隐藏
                    $dialogTitle.html("诶，打开里面居然有东西！");//改变$dialogTitle的innerHTML内容
                    $dialogDisc.html("");//清空$dialogDisc的innerHTML内容
                    $dialogKey.find(".key-tips").html("");//清空$key-tips的innerHTML内容
                    key1 = 1;//拿到该线索，key1=1
                    $("#key01").attr("data-tips", "您已经拿到该线索！");//设置该线索的自定义属性
                    $mask.addClass("show");//显示点击查看按钮
                });
            }
        } else if (dImg == 2) {//自定义属性dImg为02
            if (dTips == "您已经拿到该线索！") {//已拿到该线索
                dialogFlag = true;
                $(".key-img").addClass("result");//切换拿到线索的图片
                $(".key-img span").hide();//需要点击的线索span隐藏
                $dialogTitle.html("原来上一次下副本<br>已经过了那么久了");//改变$dialogTitle的innerHTML内容
                $dialogDisc.html("");//清空$dialogDisc的innerHTML内容
            } else {//该线索会话框首次显示
                $(".key-img_02 span").on("tap", function() {//点击该线索span
                    $(".key-img_02").addClass("result");//切换拿到线索的图片
                    $(".key-img span").hide();//需要点击的线索span隐藏
                    $dialogTitle.html("原来上一次下副本<br>已经过了那么久了");//改变$dialogTitle的innerHTML内容
                    $dialogDisc.html("");//清空$dialogDisc的innerHTML内容
                    $dialogKey.find(".key-tips").html("");//清空$key-tips的innerHTML内容
                    key2 = 1;//拿到该线索，key2=1
                    $("#key02").attr("data-tips", "您已经拿到该线索！");//设置该线索的自定义属性
                    $mask.addClass("show");//显示点击查看按钮
                });
            }
        } else if (dImg == 3) {//自定义属性dImg为03
            if (dTips == "您已经拿到该线索！") {//已拿到该线索
                dialogFlag = true;
            } else {//该线索会话框首次显示
                addShakeEvent();//调用
            }
        } else if (dImg == 4) {//自定义属性dImg为04
            if (dTips == "您已经拿到该线索！") {//已拿到该线索
                dialogFlag = true;
                $(".key-img").addClass("result");//切换拿到线索的图片
                $(".key-img span").hide();//需要点击的线索span隐藏
                $dialogTitle.html("红白机上落了一层灰尘");//改变$dialogTitle的innerHTML内容
                $dialogDisc.html("卡带插上去似乎有些接触不良");//改变$dialogDisc的innerHTML内容
            } else {//该线索会话框首次显示
                $(".key-img_04 span").on("touchstart", function() {//按下该线索span
                    $dialogTitle.html("红白机上落了一层灰尘");//改变$dialogTitle的innerHTML内容
                    $dialogDisc.html("卡带插上去似乎有些接触不良");//改变$dialogDisc的innerHTML内容
                    setTimeout(function() {//设置延时定时器，1000ms后执行
                        $(".key-img_04").addClass("result");//切换拿到线索的图片
                        $(".key-img span").hide();//需要点击的线索span隐藏
                        $dialogKey.find(".key-tips").html("");//清空$key-tips的innerHTML内容
                        key4 = 1;//拿到该线索，key4=1
                    }, 1e3);
                    $("#key04").attr("data-tips", "您已经拿到该线索！");//设置该线索的自定义属性
                    $mask.addClass("show");//显示点击查看按钮
                });
            }
        }
        $dialog.on("tap", function() {//点击会话框
            if (dialogFlag) {
                $(this).removeClass("show");//该会话框消失
                $(".item").removeClass("after");//切换原始图片
            }
        });
        $mask.on("tap", function() {//点击查看
            $mask.removeClass("show");//点击查看消失
            setTimeout(function() {//200ms后调用showResult
                showResult();//显示获取线索的对应内容
            }, 200);
            $audioResult.play();//播放成功拿到线索音频
        });
    };
    function shakeEventDidOccur() {
        $(".key-img_03").addClass("shake");//添加抖动
        $(".key-img_03").on("webkitAnimationEnd", function() {
            var $this = $(this);
            key3 = 1;//拿到该线索，key3=1
            removeShakeEvent();//??
            $this.removeClass("shake");//移出抖动
            $("#key03").attr("data-tips", "您已经拿到该线索！");//设置该线索的自定义属性
            $dialog.find(".dialog-mask").addClass("show");//显示点击查看按钮
        });
    }
    var keyString = "";//用于连接密码
    var openDoor = function() {
        var $keystatus = $(".keystatus");
        var $keystatusItem = $(".keystatus span");//输入密码
        var $numItem = $(".num-item");//0-9按键
        var $lockKeyClose = $(".lock-key_close");//取消
        var flag = 0;//计算按下几次
        $numItem.on("touchstart", function() {//按下0-9之间的数字
            var value = $(this).attr("data-num");//按下数字
            flag += 1;
            if (flag > 4) {//输入超过4个
                $keystatusItem.removeClass("active");//清空输入密码，移出背景
                $keystatusItem.eq(0).addClass("active");//输入密码超过四次，第一个span添加背景颜色
                keyString = value;//当前输入值
                flag = 1;//超过4，flag从1计算
                $keystatus.removeClass("wrong");//移出wrong,去除抖动样式
            } else {//输入密码在4个以内包括4
                $keystatusItem.eq(flag - 1).addClass("active");//对应密码位置加背景颜色
                keyString += value;//输入密码
            }
            if (flag == 4) {//输入第四个密码
                if (keyString == "0325") {//如果输入密码为0325
                    $(".page-finished").addClass("show");//page-finished显示
                    $(".page-finished p").eq(1).on("webkitAnimationEnd", function() {
                        $("#pageKV").addClass("show");
                    });
                } else {//如果输入错误
                    $keystatus.addClass("wrong");//输入密码抖动
                }
            }
        });
        $lockKeyClose.on("tap", function() {//点击取消
            $(".lock-key").removeClass("show");//输入密码页面隐藏
        });
    };
    openDoor();//执行输入密码函数
    $("#jsTips").on("tap", function() {//点击右上角提示
        showDialog($(this).attr("data-title"), $(this).attr("data-disc"));//传入提示参数
    });
});