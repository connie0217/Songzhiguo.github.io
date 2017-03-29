/**
 * Created by yuanbo on 2017/2/6.
 */
var s_04_01 = document.getElementById('s_04_01');
var moveContent = document.getElementById('moveContent');
var s_04_02 = document.getElementById('s_04_02');
var content_text02 = s_04_02.getElementsByClassName('content-text')[0];
var text_block02 =  s_04_02.getElementsByClassName('text-block')[0];
var black_over = document.getElementById('transi-black-over_04');/*阴影层*/
var s_04_01_2 = document.getElementById('s_04_01_2');
var s_04_02_2 = document.getElementById('s_04_02_2');
var s_04_02_img1_cont =  document.getElementById('s_04_02_img1_cont');/*手表父级*/
var s_04_02_img2 = document.getElementById('s_04_02_img2');
var s_04_02_rule1 = document.getElementById('s_04_02_rule-1');
var s_04_02_rule_txt = document.getElementById('s_04_02_rule-text');
var s_04_02_img3 = document.getElementById('s_04_02_img3');
var transi = document.getElementById('transi');
var transi_grey_sep = transi.getElementsByClassName('transi-grey-sep')[0];
var transi_title = transi.getElementsByClassName('transi-title')[0];
var rotzooms = s_04_02_img1_cont.getElementsByTagName('div');
/*-------*/
var s0403 = document.getElementById('s_04_03');
var s0404 = document.getElementById('s_04_04');
var s0405 = document.getElementById('s_04_05');
var s04041 = document.getElementById('s_04_04_1');
var s04042 = document.getElementById('s_04_04_2');
var caption1 = document.getElementById('caption1');
var caption2 = document.getElementById('caption2');
var caption3 = document.getElementById('caption3');
var caption4 = document.getElementById('caption4');
var caption5 = document.getElementById('caption5');
var caption6 = document.getElementById('caption6');
var caption7 = document.getElementById('caption7');
var conTexts = document.getElementsByClassName('content-text');
var textBlocks = document.getElementsByClassName('text-block');
var conImg = document.getElementsByClassName('content-img')[0];
/*window.onload = function (){
    s_04_01.style.left = '0px';
    s_04_02.style.left = '100%';
    s_04_02_img2.style.opacity='0';
};*/
//console.log(black_over);
/*
* s_04_01_2   left: -488px; 400-2000
* s_04_01     data-2200=" left: 0%; " data-3000=" left: -25%;  "
* s_04_02    data-2200="left: 100%;  " data-3000=" left: 0%;  " data-7473="left: 0%;  " data-8273="left: -50%;  "
* content_text02 data-2200=" padding-left: 100%;   " data-3000="padding-left: 0%;  "
* text_block02    data-2200="margin-left: 200%;  " data-3000="margin-left: 0%;  "
* s_04_02_2        data-3000=" left: 0px;  " data-5000="left: -2636px; "
* */
var urlData = ['url(img/ergo/rotzoom/montre-zoom_1.png)','url(img/ergo/rotzoom/montre-zoom_2.png)','url(img/ergo/rotzoom/montre-zoom_3.png)','url(img/ergo/rotzoom/montre-zoom_4.png)','url(img/ergo/rotzoom/montre-zoom_5.png)','url(img/ergo/rotzoom/montre-zoom_6.png)','url(img/ergo/rotzoom/montre-zoom_7.png)','url(img/ergo/rotzoom/montre-zoom_8.png)','url(img/ergo/rotzoom/montre-zoom_9.png)','url(img/ergo/rotzoom/montre-zoom_10.png)','url(img/ergo/rotzoom/montre-zoom_11.png)','url(img/ergo/rotzoom/montre-zoom_12.png)','url(img/ergo/rotzoom/montre-zoom_13.png)','url(img/ergo/rotzoom/montre-zoom_14.png)','url(img/ergo/rotzoom/montre-zoom_15.png)','url(img/ergo/rotzoom/montre-zoom_16.png)','url(img/ergo/rotzoom/montre-zoom_17.png)','url(img/ergo/rotzoom/montre-zoom_18.png)','url(img/ergo/rotzoom/montre-zoom_19.png)','url(img/ergo/rotzoom/montre-zoom_20.png)','url(img/ergo/rotzoom/montre-zoom_21.png)','url(img/ergo/rotzoom/montre-zoom_22.png)','url(img/ergo/rotzoom/montre-zoom_23.png)','url(img/ergo/rotzoom/montre-zoom_24.png)','url(img/ergo/rotzoom/montre-zoom_25.png)','url(img/ergo/rotzoom/montre-zoom_26.png)'];
window.scrollTo(0,400);
var timer = null;
var timer2 = null;
var timer3 = null;
var n =0;
var m =0;
timer=setInterval(function () {
    n++;
    var t=5*n
    transi_grey_sep.style.top=100-t+'%';
    if(t>=100){
        moveContent.style.marginLeft=0;
        clearInterval(timer);
    }
},50);
setTimeout(function () {
    timer2 = setInterval(function () {
        m++;
        var t = 10*m;
        transi_title.style.top = 200-t+'%';
        if(t>=200){
            m=0;
            n=0;
            black_over.style.opacity=0;
            clearInterval(timer2);
            timer3=setInterval(function () {
                n++;
                transi_title.style.left=transi_grey_sep.style.left=-n*5+'%';
                if(n>=20){
                    clearInterval(timer3);
                    var timer =null;
                    timer = setInterval(function () {
                        m++;
                        moveContent.style.marginLeft=-20*m+'px'
                        if(m>=32){
                            clearInterval(timer);
                        }
                    },20)
                }
            },50)
        }
    },100)
},50);

//---手表各个方位的背景图设置；
for(var i=1;i<rotzooms.length;i++){
    rotzooms[i].style.background=urlData[i];
    rotzooms[i].style.display='none';
}
var change = null;
var num = 0;
rotzooms[0].style.display = 'block';
/*-------*/
s0403.style.left = '100%';
s0404.style.left = '100%';
s0405.style.left = '100%';
window.onscroll = function (ev) {
    var windowY = window.pageYOffset;
    if(windowY<20){
        location.href = '../03-manufacture/03-manufacture.html';
    }
    if(windowY<5724 || windowY>6824){
        s_04_02_img2.style.opacity =0;
    }
    if(windowY<6973){
        s_04_02_img3.style.opacity =0;
    }
    if(windowY<2200){
        s_04_01.style.left =0;
    }
    if(windowY<3000){
        s_04_02_2.style.left = 0;
    }
    if(windowY<=400){
        change = 1;
        betweenClass(black_over);
       // s_04_01_2.style.left =0;

    }
    if(windowY>400 && windowY<2000){
        change =2;
        //afterClass(black_over);
        betweenClass(s_04_01_2);
        s_04_02.style.left = '100%';
        black_over.style.opacity=0;
        s_04_01.style.cssText='';
        s_04_01.style.left=0;
    }
    if(windowY>=2200 && windowY<=3000){
        /*
        *s_04_01, s_04_02,content_text02,text_block02
        * */
        //change = 3;
        var pl = (windowY-2200)*0.125;
        var l = (windowY-2200)*0.03125;
        content_text02.style.paddingLeft =100-pl+'%';
        text_block02.style.marginLeft = 200-2*pl+'%';
        s_04_01.style.left = -l+'%';
        s_04_02.style.left =100-pl+'%';
        s_04_01_2.style.left = '-488px';
    }
    if(windowY>3000 && windowY<=5000){
        s_04_02.style.left=content_text02.style.paddingLeft =  text_block02.style.marginLeft=0;
        s_04_01.style.left='-25%';
        //change = 4;
        var n = windowY-3000;
        s_04_02_2.style.left = -1.318*n+'px';
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[0].style.display = 'block';
    }
    if(windowY>5000 && windowY<5424){
        s_04_02_2.style.left ='-2636px';
    }
    if(windowY>5424 && windowY<5449){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[0].style.display = 'block';
    }
    if(windowY>=5449 && windowY<5474){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[1].style.display = 'block';
    }
    if(windowY>=5449 && windowY<5499){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[2].style.display = 'block';
    }
    if(windowY>=5499 && windowY<5524){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[3].style.display = 'block';
    }
    if(windowY>=5524 && windowY<5549){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[4].style.display = 'block';
    }
    if(windowY>=5549 && windowY<5574){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[5].style.display = 'block';
    }
    if(windowY>=5574 && windowY<5599){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[6].style.display = 'block';
    }
    if(windowY>=5599 && windowY<5624){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[7].style.display = 'block';
    }
    if(windowY>=5624 && windowY<5649){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[8].style.display = 'block';
    }
    if(windowY>=5649 && windowY<5674){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[9].style.display = 'block';
    }
    if(windowY>=5674 && windowY<5699){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[10].style.display = 'block';
        s_04_02_img2.style.opacity =0;
    }
    if(windowY>=5699 && windowY<5724){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[11].style.display = 'block';
        s_04_02_img2.style.opacity =0;
    }
    if(windowY>=5724 && windowY<6748){
        var op = 0;
        var mt = 0;
        var h =0;
        var op2=0;
        if(windowY<5924){
            op = (windowY-5724)*0.005;
            s_04_02_img2.style.opacity =op;
        }
        if(windowY>=5924 && windowY<6624){
            s_04_02_img2.style.opacity ='1';
        }
        if(windowY>5924 && windowY<6324){
            mt = (windowY-5924)*0.085;
            h  = (windowY-5924)*0.17;
            s_04_02_rule1.style.marginTop=34-mt+'px';
            s_04_02_rule1.style.height=h+'px';
        }else if(windowY>=6324){
            s_04_02_rule1.style.marginTop='0px';
            s_04_02_rule1.style.height=h+'68px';
        }
        if(windowY>6324 && windowY<6424){
            op2 = (windowY-6324)*0.01;
            s_04_02_rule_txt.style.opacity = op2;
        }else if(windowY>6424){
            s_04_02_rule_txt.style.opacity = '1';
        }
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[12].style.display = 'block';
    }
    if(windowY>=6624 && windowY<6824){
        var op = 1-(windowY-6624)*0.005;
        s_04_02_img2.style.opacity =op;
    }
    if(windowY>=6773 && windowY<6798){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[13].style.display = 'block';
    }
    if(windowY>=6798 && windowY<6823){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[14].style.display = 'block';
        s_04_02_img2.style.opacity =0;
    }
    if(windowY>=6823 && windowY<6848){
        s_04_02_img2.style.opacity =0;
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[15].style.display = 'block';
    }
    if(windowY>=6848 && windowY<6873){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[16].style.display = 'block';
    }
    if(windowY>=6873 && windowY<6898){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[17].style.display = 'block';
    }
    if(windowY>=6898 && windowY<6923){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[18].style.display = 'block';
    }
    if(windowY>=6923 && windowY<6948){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[19].style.display = 'block';
    }
    if(windowY>=6948 && windowY<6973){
        for(var i=0;i<rotzooms.length;i++){
            rotzooms[i].style.display = 'none';
        }
        rotzooms[20].style.display = 'block';
        s_04_02_img3.style.opacity=0;
    }
    if(windowY>=6973 && windowY<7273){
        var op= (windowY-6973)*0.0033;
        s_04_02_img3.style.opacity=op;
        if(windowY>=6973 && windowY<6998){
            for(var i=0;i<rotzooms.length;i++){
                rotzooms[i].style.display = 'none';
            }
            rotzooms[21].style.display = 'block';
        }else if(windowY>=6998 && windowY<7023){
            for(var i=0;i<rotzooms.length;i++){
                rotzooms[i].style.display = 'none';
            }
            rotzooms[22].style.display = 'block';
        }else if(windowY>=7023 && windowY<7048){
            for(var i=0;i<rotzooms.length;i++){
                rotzooms[i].style.display = 'none';
            }
            rotzooms[23].style.display = 'block';
        }else if(windowY>=7048 && windowY<7073){
            for(var i=0;i<rotzooms.length;i++){
                rotzooms[i].style.display = 'none';
            }
            rotzooms[24].style.display = 'block';
        }else if(windowY>=7073){
            for(var i=0;i<rotzooms.length;i++){
                rotzooms[i].style.display = 'none';
            }
            rotzooms[25].style.display = 'block';
        }
    }
    /*---------------------------------------------*/
    if (windowY <= 7473){
        s0403.style.left = '100%';
        //设计
        conTexts[2].style.paddingLeft = '100%';
        textBlocks[2].style.marginLeft = '200%';
    }
    //滚动条距离在7473 - 8273之间，s0403随滚动距离滚动
    if (windowY>7473 && windowY <= 8273){
        var t3 = (windowY-7473)/(8273-7473);
        s0403.style.left = '100'-t3*100+'%';
        conTexts[2].style.paddingLeft = '100'-t3*100+'%';
        textBlocks[2].style.marginLeft = '200'-t3*200+'%';
    }
    if(windowY > 8273) {
        textBlocks[2].style.marginLeft = '0%';
    }
    //滚动条距离在8273 - 8473之间，s0403left为0%
    if(windowY > 8273 && windowY <= 8473) {
        s0403.style.left = '0%';
    }
    //滚动条距离8473时，s0404left值为100%
    if (windowY <= 8473){
        s0404.style.left = '100%';
        conTexts[2].style.marginLeft = '0';
        conTexts[3].style.paddingLeft = '100%';
        textBlocks[3].style.marginLeft = '200%';
    }
    //滚动条距离在8473 - 9273之间，s0403、s0404随滚动距离滚动
    if (windowY > 8473 && windowY <= 9273){
        var t4 = (windowY-8473)/(9273-8473);
        s0404.style.left = '100'-t4*100+'%';
        s0403.style.left = -t4*70+'%';
        conTexts[2].style.marginLeft = -t4*300+'px';
        conTexts[3].style.paddingLeft = '100'-t4*90+'%';
        textBlocks[3].style.marginLeft = '200'-t4*200+'%';
    }
    if (windowY <= 9273){
        conTexts[1].style.left = '0%';
    }
    if (windowY > 9273){
        s0403.style.left = '-70%';
        conTexts[2].style.marginLeft = '-300px';
        textBlocks[3].style.marginLeft = '0%';
        conTexts[3].style.left = '10%';
    }
    if (windowY > 9273 && windowY <= 15273){
        var tT = (windowY-9273)/(15273-9273);
        conTexts[3].style.left = -tT*40+'%';
    }
    if (windowY > 15273){
        conTexts[3].style.left = '-40%';
    }

    //滚动条距离在9273 - 16473之间，s0404left为0%
    if (windowY > 9273 && windowY <= 16473){
        s0404.style.left = '0%';
        if (windowY > 9273 && windowY <= 15273){
            var t41 = (windowY-9273)/(15273-9273);
            s04041.style.marginLeft = -t41*1971+'px';
        }
        var t42 = (windowY-10873)/(15273-10873)*170;
        if (windowY > 10873 && windowY <= 15273){
            s04042.style.marginLeft = -t42+'px';
        }
        if (windowY > 15273 && windowY <= 16473){
            var t43 = (windowY-15273)/(15273-10873)*673;
            s04042.style.marginLeft = -(t43+t42)+'px';
        }
    }

    //滚动条距离小于16473时，s0405left值为100%
    if (windowY <= 16473){
        s0405.style.left = '100%';
        conTexts[4].style.paddingLeft = '100%';
        textBlocks[4].style.marginLeft = '200%';
        conImg.style.marginLeft = '300%';
    }
    //滚动条距离在16473 - 17273之间，s0404、s0405随滚动距离滚动
    if (windowY > 16473 && windowY <= 17273){
        var t5 = (windowY-16473)/(17273-16473);
        s0404.style.left =  -t5*50+'%';
        s0405.style.left =  '100'-t5*100+'%';
        conTexts[4].style.paddingLeft = '100'-t5*100+'%';
        textBlocks[4].style.marginLeft =  '200'-t5*200+'%';
        conImg.style.marginLeft = '300'-t5*300+'%';
    }
    //滚动条距离大于17273时，s0405left值为0%
    if (windowY > 17273){
        s0404.style.left = '-50%';
        s0405.style.left = '0%';
        conTexts[4].style.paddingLeft = '0%';
        textBlocks[4].style.marginLeft =  '0%';
        conImg.style.marginLeft = '0%';
        console.log(windowY);
        /*if(windowY>17500){
            location.href = '../EndShow/EndShow.html';
        }*/
    }

    //透明移动文字
    opacityMove(caption1,9473,9673,10073,10273);
    opacityMove(caption2,10273,10473,10873,11073);
    opacityMove(caption3,11073,11273,11673,11873);
    opacityMove(caption4,11873,12073,12473,12673);
    opacityMove(caption5,14273,14473,14873,15073);
    opacityMove(caption6,15073,15273,15673,15873);
    opacityMove(caption7,15873,16073,16473,16673);
    function opacityMove(obj,n1,n2,n3,n4) {
        if (windowY <= n1){
            obj.style.marginLeft = '200px';
            obj.style.opacity = '0';
        }
        if (windowY > n1 && windowY<= n2){
            var tP = (windowY-n1)/(n2-n1);
            obj.style.marginLeft = 200-tP*200+'px';
            obj.style.opacity = tP;
        }
        if (windowY > n2 && windowY<= n3){
            var tP2 = (windowY-n2)/(n3-n2);
            obj.style.marginLeft = -tP2*5+'px';
            obj.style.opacity = '1';
        }
        if (windowY > n3 && windowY<= n4){
            var tP3 = (windowY-n3)/(n4-n3);
            obj.style.marginLeft = -tP3*200+'px';
            obj.style.opacity = '1'-tP3;
        }
        if (windowY >n4){
            obj.style.marginLeft = '-200px';
            obj.style.opacity = '0';
        }
    }


    //滚动条在规定范围内强制数值
    if (windowY>8273){
        conTexts[0].style.paddingLeft = '0';
    }
    if (windowY<9273){
        s04041.style.marginLeft = '0';
    }
    if (windowY<10873){
        s04042.style.marginLeft = '0';
    }
    if (windowY>15273){
        s04041.style.marginLeft = '-1971px';
    }
    if (windowY>16473){
        s04042.style.marginLeft = '-400px';
    }
    switch (change){
        case 1:
            black_over.style.opacity = 0.5-windowY*0.00125;
            break;
        case 2:
            var n =(windowY-400)*0.305;
            if(n>488){
                n=488;
            }
            s_04_01_2.style.left =-n+'px';
            break;
        case 3:

            break;
        case 4:

            break;
        case 5:

    }

};
function show(obj) {
    obj.style.display = 'block';
};
function none(obj) {
    obj.style.display = 'none';
}
function betweenClass(obj) {
    var c = obj.className;
    var arr = c.split(' ');
    arr[arr.length-1]='skrollable-between';
    return obj.className=arr.join(' ');
}
function beforeClass(obj) {
    var c = obj.className;
    var arr = c.split(' ');
    arr[arr.length-1]='skrollable-before';
    return obj.className=arr.join(' ');
}
function afterClass() {
    var c = obj.className;
    var arr = c.split(' ');
    arr[arr.length-1]='skrollable-after';
    return obj.className=arr.join(' ');
}
function addMouseWheel(obj,fnUp,fnDown){
    obj.onmousewheel = fn;
    obj.addEventListener('DOMMouseScroll',fn);
    function fn(ev){
        //true向上，false是向下
        var onOff = null;
        if(ev.wheelDelta){
            //chrome/ie
            onOff  = ev.wheelDelta>0?true:false;
        }else{
            //fireFox
            onOff  = ev.detail<0?true:false;
        }
        if(onOff){
            //向上
            if(typeof fnUp == 'function'){
                fnUp && fnUp();
            }
        }else{
            //向下
            if(typeof fnDown == 'function'){
                fnDown && fnDown();
            }
        }
        ev.preventDefault;
    }
}



