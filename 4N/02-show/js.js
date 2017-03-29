/**
 * Created by 孙国庆 on 2017/2/5.
 */

window.onload = function(){
    var oXh_wrapper = document.getElementById('xh-wrapper');
    
    var oBg_00 = document.getElementById('xh-bg-0');
    var oBg_01 = document.getElementById('xh-bg-1');
    var oBg_02 = document.getElementById('xh-bg-2');
    
    var oFotTop = document.getElementById('fot-top');
    var oFotCen = document.getElementById('fot-cen');
    var oFotBot = document.getElementById('fot-bot');
    var oFotWrap = document.getElementById('fot-wrap');
    
    var oXh_content_01 = document.getElementById('xh-content-01');  //场景1
    var oXh_fun_img = oXh_content_01.getElementsByClassName('xh-fun-img')[0];  //场景1表盘转动图片
    var n1 = 0;
    
    var oXh_content_02 = document.getElementById('xh-content-02');  //场景2
    var oH2 = oXh_content_02.children[0];
    var oP = oXh_content_02.children[1];
    
    var oXh_content_03 = document.getElementById('xh-content-03');  //场景3
    
    var oXh_content_04 = document.getElementById('xh-content-04');  //场景4
    
    
    var oXh_img = document.getElementsByClassName('xh-img')[0];  //手表零件的父级
    var aImg = oXh_img.children;  //所有手表的零件
    var arrImg = [];
    var arrTxt = ['01-welcome','02-show','03-manufacture','04-design'];
    
    
    /*开场动画*/
    var timer = null;
    var n=0;
    var oW = window.innerWidth;
    var oH = window.innerHeight;
    
    document.body.index = 1;  //当前在哪个页面上
    
    window.scrollTo(0,400);
    
    
    timer = setInterval(function(){
        n++;
        oBg_01.style.top = 565 - n*13 + 'px';
        oBg_02.style.top = 565 - n*10 + 'px';
        if(n>56){
            clearInterval(timer);
            oBg_00.style.display = 'block';
            oBg_02.style.top = 0;
            oBg_01.style.display = 'none';
            setTimeout(function(){
                move(oBg_02,{left:-oW},500,'easeOut')
            },1000);
            
            oXh_content_01.style.display = 'block';
            oXh_content_01.style.left = oW + 'px';
            
            setTimeout(function(){
                move(oXh_content_01,{left:0},300,'easeOut')
            },1000);
        }
    },10);
    
    oXh_content_02.style.display = 'block';
    oXh_content_02.style.left = oW-17 + 'px';
    
    for(var i=0; i<aImg.length; i++){
        arrImg.push(aImg[i].offsetTop);
    }
    
    window.onscroll = function(){
        
        var sH = window.pageYOffset;  //滚动条滚动的距离
        
        if(sH < 50) {
            location.href = '../01-welcome/01-welcome.html';  //跳转到上一页
        }
        
        if(sH < 400){
            oBg_00.style.display = 'block';
            oBg_00.style.backgroundColor = '#000';
            oBg_00.style.opacity = (400 - sH)/500;
            oBg_00.style.zIndex = 6;
        }else{
            oBg_00.style.display = 'none';
        }
        
        /*场景1鼠标滚动*/
        if(sH <= 400){
            oXh_fun_img.style.backgroundPositionY = '0px';
        }else if(sH > 400 && sH < 450){
            oXh_fun_img.style.backgroundPositionY = '-365px';
        }else if(sH >= 450 && sH < 475){
            oXh_fun_img.style.backgroundPositionY = '-730px';
        }else if(sH >= 475 && sH < 500){
            oXh_fun_img.style.backgroundPositionY = '-1095px';
        }else if(sH >= 500 && sH < 525){
            oXh_fun_img.style.backgroundPositionY = '-1460px';
        }else if(sH >= 525 && sH < 550){
            oXh_fun_img.style.backgroundPositionY = '-1825px';
        }else if(sH >= 550 && sH < 575){
            oXh_fun_img.style.backgroundPositionY = '-2190px';
        }else if(sH >= 575 && sH < 600){
            oXh_fun_img.style.backgroundPositionY = '-2555px';
        }else if(sH >= 600 && sH < 625){
            oXh_fun_img.style.backgroundPositionY = '-2920px';
        }else if(sH >= 625 && sH < 650){
            oXh_fun_img.style.backgroundPositionY = '-3285px';
        }else if(sH >= 650 && sH < 675){
            oXh_fun_img.style.backgroundPositionY = '-3650px';
        }else if(sH >= 675 && sH < 700){
            oXh_fun_img.style.backgroundPositionY = '-4015px';
        }else if(sH >= 700 && sH < 725){
            oXh_fun_img.style.backgroundPositionY = '-4380px';
        }else if(sH >= 725 && sH < 750){
            oXh_fun_img.style.backgroundPositionY = '-4745px';
        }else if(sH >= 750 && sH < 775){
            oXh_fun_img.style.backgroundPositionY = '-5110px';
        }else if(sH >= 775 && sH < 800){
            oXh_fun_img.style.backgroundPositionY = '-5475px';
        }else if(sH >= 800 && sH < 825){
            oXh_fun_img.style.backgroundPositionY = '-5840px';
        }else if(sH >= 825 && sH < 850){
            oXh_fun_img.style.backgroundPositionY = '-6205px';
        }else if(sH >= 850 && sH < 875){
            oXh_fun_img.style.backgroundPositionY = '-6570px';
        }else if(sH >= 875 && sH < 900){
            oXh_fun_img.style.backgroundPositionY = '-6935px';
        }else if(sH >= 900 && sH < 925){
            oXh_fun_img.style.backgroundPositionY = '-7300px';
        }else if(sH >= 925){
            oXh_fun_img.style.backgroundPositionY = '-7300px';
        }
    
        /*场景2*/
        if(sH < 1124){
            
            oXh_content_02.style.left = oW + 'px';
            oXh_content_01.style.left = 0;
            
        }else if(sH >= 1124 && sH <= 1924){
            
            n1 = (1924-sH)/800*oW;
            
            oXh_content_01.style.left = (n1-oW)/2 + 'px';  //场景1移动
            oXh_content_02.style.left = n1 + 'px';  //场景2移动
            
            oH2.style.left = 600 - 400/800*(sH-1124) + 'px';  //场景二标题移动
            oP.style.left = 1000 - 800/800*(sH-1124) + 'px';  //场景二内容移动
            
        }else if(sH > 1924){
            oXh_content_02.style.left = 0;
            oH2.style.left = '200px';
            oP.style.left = '200px';
        }
        
        /*手表零件运动*/
        if(sH < 2124){
            for(var i=0; i<aImg.length; i++){
                aImg[i].style.top = '';
            }
        }else if(sH >= 2124 && sH <=5124){
            for(var i=0; i<aImg.length; i++){
                
                if(arrImg[i] < 0){
                    aImg[i].style.top = arrImg[i] + ((sH - 2124) * (Math.abs(arrImg[i])/3000)) + 'px';
                }else{
                    aImg[i].style.top = arrImg[i] - ((sH - 2124) * (Math.abs(arrImg[i])/3000)) + 'px';
                }
                
            }
        }else if(sH > 5124){
            for(var i=0; i<aImg.length; i++){
                aImg[i].style.top = 0;
            }
        }
    
        oXh_content_03.style.display = 'block';
        oXh_content_03.style.left = oW-17 + 'px';
        
        /*场景3出现*/
        if(sH >=5324 && sH <= 9924){
            oXh_content_02.style.display = 'block';
            oXh_content_02.style.left = (- (sH-5324)/4600*4095)/2 + 'px';  //场景2移动
            oXh_content_03.style.left = (oW-17) - (sH-5324)/4600*4095  + 'px';  //场景3移动
        }else if(sH > 9924 && sH < 10244){
            oXh_content_02.style.display = 'none';
            oXh_content_03.style.left = oW - 4095  + 'px';  //场景3移动
        }
        
        
        oXh_content_04.style.display = 'block';
        oXh_content_04.style.left = oW-17 + 'px';
        
        /*场景4出现*/
        if(sH >=10244 && sH <= 13244){
            oXh_content_03.style.left = (- (sH-10244)/3000*4095)/2 + (oW - 4095) + 'px';  //场景3移动
            oXh_content_04.style.left = (oW-17) - (sH-10244)/3000*2800  + 'px';  //场景4移动
        }else if(sH > 13244 ){
            oXh_content_04.style.left = oW - 2800  + 'px';
            location.href = '../03-manufacture/03-manufacture.html';  //跳转到下一个页面
        }else if(sH > 13400){
            location.href = '../03-manufacture/03-manufacture.html';  //跳转到下一个页面
        }
    };
    
    
    show();  //判断哪个按钮为激活状态
    var arrHref = ['../01-welcome/01-welcome.html','../02-show/02-show.html','../03-manufacture/03-manufacture.html','../04-design/04-design.html'];
    
    oFotWrap.onmouseenter = function(){
        oFotTop.style.top = '-20px';
        oFotTop.style.color = 'rgba(0,0,0,1)';
        for(var i=0; i<oFotCen.children.length; i++){
            
            if(i == document.body.index){
                oFotCen.children[i].style.transform = 'scale(0.8)';
            }else{
                oFotCen.children[i].style.transform = 'scale(0.6)';
            }
        }
    };
    
    oFotTop.onmouseleave = oFotBot.onmouseenter = function(){
        oFotTop.style.cssText = '';
        for(var i=0; i<oFotCen.children.length; i++){
            oFotCen.children[i].style.cssText = '';
        }
        
        show();  //判断哪个按钮为激活状态
    };
    
    for(var i=0; i<oFotCen.children.length; i++){
        oFotCen.children[i].index = i;
        
        /*按钮鼠标移入*/
        oFotCen.children[i].onmouseenter = function(){
            oFotTop.innerHTML = arrTxt[this.index];
            for(var j=0; j<oFotCen.children.length; j++){
                if(j == document.body.index){
                    oFotCen.children[j].style.transform = 'scale(0.8)';
                    oFotCen.children[j].style.backgroundColor = '#fbb034';
                }else{
                    oFotCen.children[j].style.transform = 'scale(0.6)';
                    oFotCen.children[j].style.backgroundColor = '#000';
                }
                
            }
            
            this.style.backgroundColor = '#fbb034';
            this.style.transform = 'scale(0.8)';
        };
        
        /*按钮移出*/
        oFotCen.children[i].onmouseleave = function(){
            oFotTop.innerHTML = arrTxt[document.body.index];
            for(var j=0; j<oFotCen.children.length; j++){
                if(j == document.body.index){
                    oFotCen.children[j].style.transform = 'scale(0.8)';
                    oFotCen.children[j].style.backgroundColor = '#fbb034';
                }else{
                    oFotCen.children[j].style.transform = 'scale(0.6)';
                    oFotCen.children[j].style.backgroundColor = '#000';
                }
        
            }
            
        };
        
        /*按钮点击*/
        oFotCen.children[i].onclick = function(){
            location.href = arrHref[this.index];
        }
        
    }
    
    
    function show(){
        switch (document.body.index){
            case 0:
                oFotCen.children[0].style.backgroundColor = '#fbb034';
                oFotCen.children[0].style.transform = 'scale(0.6)';
                oFotTop.innerHTML = arrTxt[0];
                break;
            case 1:
                oFotCen.children[1].style.backgroundColor = '#fbb034';
                oFotCen.children[1].style.transform = 'scale(0.6)';
                oFotTop.innerHTML = arrTxt[1];
                break;
            case 2:
                oFotCen.children[2].style.backgroundColor = '#fbb034';
                oFotCen.children[2].style.transform = 'scale(0.6)';
                oFotTop.innerHTML = arrTxt[2];
                break;
            case 3:
                oFotCen.children[3].style.backgroundColor = '#fbb034';
                oFotCen.children[3].style.transform = 'scale(0.6)';
                oFotTop.innerHTML = arrTxt[3];
                break;
        }
    }
    
};