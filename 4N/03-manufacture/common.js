/**
 * Created by 孙国庆 on 2017/2/9.
 */
window.onload = function(){
var oFotTop = document.getElementById('fot-top');
var oFotCen = document.getElementById('fot-cen');
var oFotBot = document.getElementById('fot-bot');
var oFotWrap = document.getElementById('fot-wrap');
    
var arrTxt = ['01-welcome','02-show','03-manufacture','04-design'];

show();  //判断哪个按钮为激活状态

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
    var arrHref = ['../01-welcome/01-welcome.html','../02-show/02-show.html','../03-manufacture/03-manufacture.html','../04-design/04-design.html'];

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