window.onload = function(){
	var skrollable = document.getElementsByClassName('skrollable');
	var s_03_01 = document.getElementById('s_03_01');
	var s_03_02 = document.getElementById('s_03_02');
	var s_03_01_img_box = s_03_01.getElementsByClassName('img-cont')[0];
	var s_03_01_imgs = s_03_01_img_box.getElementsByTagName('img');
	var mask = document.getElementById('mask');
	var h2 = s_03_02.getElementsByTagName('h2')[0];
	var timer = document.getElementById('timer');
	var s_03_04 = document.getElementById('s_03_04');
	var timerDivs = timer.getElementsByTagName('div');
	var s_03_06 = document.getElementById('s_03_06');
	var swatch = document.getElementById('swatch');
	var btns = swatch.getElementsByTagName('p');
	var change = swatch.getElementsByTagName('div');
	
	document.body.index = 2;
	
	btns[0].onclick = function(){
		for(var i=0;i<change.length;i++){
			if( change[i].style.opacity == 1 ){
				move(change[i],{opacity:0,top:400},1000,'linear',function(){
					if(i==0){
						i = change.length;
					}
					move(change[i-1],{opacity:1,top:320},1000,'linear');
				});
				break;
			}
		}
	};
	btns[1].onclick = function(){
		for(var i=0;i<change.length;i++){
			if( change[i].style.opacity == 1 ){
				move(change[i],{opacity:0,top:400},1000,'linear',function(){
					if(i==change.length-1){
						i = -1;
					}
					move(change[i+1],{opacity:1,top:320},1000,'linear');
				});
				break;
			}
		}
	};
	
	var winWidth = window.innerWidth;
	var scroll = true;//判断滚动的效果是否翻页
	for(var i=0;i<skrollable.length;i++){
		skrollable[i].style.left = i*winWidth + 'px';
	}
	setTimeout(function(){
		for(var i=0;i<skrollable.length;i++){
			move(skrollable[i],{left:(i-1)*winWidth},800,'linear');
		}
	},1500);
	timer.style.left = winWidth/2-timer.offsetWidth/2+'px';
	//滚轮翻页
	
	var end = true;
	var end2 = true;
	var end3 = true;
	function Fn0302(ev){
		var pos = document.getElementById('pos');
		var nums = pos.getElementsByTagName('div');
		var t1 = parseInt(getComputedStyle(nums[0]).backgroundPositionY);
		var t2 = parseInt(getComputedStyle(nums[1]).backgroundPositionY);
		
		if( ev.deltaY > 0 ){//向下滚
			if( Math.abs(t2)+82 >= 817 ){
				if( Math.abs(t1-10) > 82 ){
					nums[0].style.backgroundPositionY = -82 + 'px';
				}else{
					nums[0].style.backgroundPositionY = t1 -10 + 'px';
				}
			}
			if( Math.abs(t2) >= 817 ){
				t2 = 10;
			}
			nums[1].style.backgroundPositionY = t2 -10 + 'px';
		}
		if( ev.deltaY < 0 ){//向上滚
			if( t2 >=0 && t2 <80 ){
				nums[0].style.backgroundPositionY = t1 +10 + 'px';
			}
			if( t2-80 >= 0 ){
				t2 = -746;
			}
			if( t2+10 == -6 ){
				t2 = -12;
			}
			nums[1].style.backgroundPositionY = t2 +10 + 'px';
		}
		var lt1 = parseInt(getComputedStyle(nums[0]).backgroundPositionY);
		var lt2 = parseInt(getComputedStyle(nums[1]).backgroundPositionY);
		console.log(lt1,lt2)
		if( (lt1==-2&&lt2==-2) || (lt1==-82&&lt2<=-490) ){
			end2 = false;
			scroll = true;
		}
	}
	
	function Fn0304(ev){
		var pos0 = parseInt( getComputedStyle(timerDivs[0]).backgroundPositionY );
		var pos1 = parseInt( getComputedStyle(timerDivs[1]).backgroundPositionY );
		var pos2 = parseInt( getComputedStyle(timerDivs[2]).backgroundPositionY );
		var pos3 = parseInt( getComputedStyle(timerDivs[3]).backgroundPositionY );
		var pos4 = parseInt( getComputedStyle(timerDivs[4]).backgroundPositionY );
		
		var pos5 = parseInt( getComputedStyle(timerDivs[5]).backgroundPositionY );
		if( ev.deltaY > 0 ){//向下滚
			if( Math.abs(pos5-10)<10 ){
				pos5 = 10;
			}
			timerDivs[5].style.backgroundPositionY = pos5 - 10 +'px';
			if( Math.abs(pos5-10)>=737  ){
				if( Math.abs(pos0-10)>=84 ){
					pos0 = -74;
				}
				console.log(pos0)
				timerDivs[0].style.backgroundPositionY = pos0 - 10 +'px';
				if( Math.abs(pos1-10)>=817 || pos1 == 0 ){
					pos1 = 10;
				}
				timerDivs[1].style.backgroundPositionY = pos1 - 10 +'px';
				if( Math.abs(pos2-10)>=245 || pos2 == 0 ){
					pos2 = 10;
				}
				timerDivs[2].style.backgroundPositionY = pos2 - 10 +'px';
				if( Math.abs(pos3-10)>=327 || pos3 == 0 ){
					pos3 = 10;
				}
				timerDivs[3].style.backgroundPositionY = pos3 - 10 +'px';
				if( Math.abs(pos4-10)>=491 || pos4 == 0 ){
					pos4 = 10;
				}
				timerDivs[4].style.backgroundPositionY = pos4 - 10 +'px';
			}
			console.log(pos0,pos1,pos2,pos3,pos4,pos5)
			if( pos0 == -74 && pos1 == 10 && pos2 == 10 && pos3 == 10 && pos4 == 10 ){
				end3 = false;
				scroll = true;
			}
		}
		if( ev.deltaY < 0 ){//向上滚
			console.log(pos0,pos1,pos2,pos3,pos4,pos5)
			if( Math.abs(pos5+10)==10 ){
				pos5 = -10;
			}
			timerDivs[5].style.backgroundPositionY = pos5 + 10 +'px';
			if( pos0 >= 0 ){
				pos0 = -10;
				pos1 = pos2 = pos3 = pos4 = 70;
			}
			timerDivs[0].style.backgroundPositionY = pos0 + 10 +'px';
			timerDivs[1].style.backgroundPositionY = pos1 + 10 +'px';
			timerDivs[2].style.backgroundPositionY = pos2 + 10 +'px';
			timerDivs[3].style.backgroundPositionY = pos3 + 10 +'px';
			timerDivs[4].style.backgroundPositionY = pos4 + 10 +'px';
			if( pos0 == -10 && pos5 == -10 ){
				end3 = false;
				scroll = true;
			}
		}
	}
	document.onmousewheel = function(ev){
		var Pos0306 = parseInt( getComputedStyle(s_03_06).left );
		
		if( ev.deltaY > 0 ){//向下滚
			if( Pos0306 == 0 ){
                location.href = '../04-design/04-design.html';  //跳转到下一个页面
				return;
			}
		}
		if( ev.deltaY < 0 ){//向上滚
			if( s_03_01_imgs[0].style.top == '0px' ){
                location.href = '../02-show/02-show.html';  //跳转到上一个页面
				return;
			}
		}
//		图片的滚动
		if( parseInt(s_03_01.style.left) == 0 && end){
			scroll = false;
			end = false;
			for(var j=0;j<s_03_01_imgs.length;j++){
				var t = parseFloat(getComputedStyle(s_03_01_imgs[j]).top);
				if( ev.deltaY > 0 ){//向下滚
					if( parseFloat(getComputedStyle(s_03_01_imgs[s_03_01_imgs.length-1]).top) == -s_03_01_imgs[0].offsetHeight*(s_03_01_imgs.length-1) ){
						scroll = true;
						end = false;
						return;
					}
					move(s_03_01_imgs[j],{top:t - s_03_01_imgs[0].offsetHeight/2},200,'linear',function(){
						end = true;
					});
				}
				if( ev.deltaY < 0 ){//向上滚
					if( parseFloat(getComputedStyle(s_03_01_imgs[0]).top) == 0 ){
						scroll = true;
						end = false;
						return;
					}
					move(s_03_01_imgs[j],{top:t + s_03_01_imgs[0].offsetHeight/2},200,'linear',function(){
						end = true;
					});
				}
			}
		}
		if( parseInt(s_03_02.style.left) == 0 && end2 ){
			scroll = false;
			Fn0302(ev);
		}
		if( parseInt(s_03_04.style.left) == 0 && end3 ){
			scroll = false;
			Fn0304(ev);
		}
		
//		页面的滚动
		if( scroll ){
			for(var i=0;i<skrollable.length;i++){
				var l = parseFloat(getComputedStyle(skrollable[i]).left);
				if( ev.deltaY > 0 ){//向下滚
					skrollable[i].style.left = l - winWidth/30 + 'px';
					if( parseInt(s_03_02.style.left)>0 && parseInt(s_03_02.style.left)<winWidth ){
						slowMove(h2,10);
					}
				}else{//向上滚
					skrollable[i].style.left = l + winWidth/30 + 'px';
					if( parseInt(s_03_01.style.left) == 0 ){
						end = true;
					}
					if( parseInt(s_03_02.style.left) == 0 ){
						end2 = true;
					}
					if( parseInt(s_03_04.style.left) == 0 ){
						end3 = true;
					}
				}
			}
		}
	}
	setPadding(h2,1000);//把‘独特性’等需要有移动视觉差先给一个padding
	function setPadding(obj,num){
		obj.style.paddingLeft = num + 'px';
	}
	function slowMove(obj,s){
		var l = parseFloat( getComputedStyle(obj).paddingLeft );
		console.log(l)
		obj.style.paddingLeft = l - s + 'px';
	}
    
    var oFotTop = document.getElementById('fot-top');
    var oFotCen = document.getElementById('fot-cen');
    var oFotBot = document.getElementById('fot-bot');
    var oFotWrap = document.getElementById('fot-wrap');
    
    var arrTxt = ['01-welcome','02-show','03-manufacture','04-design'];
    
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
