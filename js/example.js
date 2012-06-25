
function checkWin(){
    for(i=0,len=myGame.bubbles.length;i<len;i++){
        var bubble = myGame.bubbles[i];
        if(bubble.num==WINSCORE){
            score +=WINSCORE;
            myGame.changeBubble(i);
        }
    }
}
function updateClick(event){
    
    //var bubble=createBubble();
    //myGame.addBubble(bubble);
    for(var i=0,len=myGame.bubbles.length;i<len;i++){
        var bubble=myGame.bubbles[i];
        var xdiff=bubble.x - event.layerX,
              ydiff=bubble.y - event.layerY,
              s=Math.pow((xdiff*xdiff + ydiff*ydiff),0.5);
        //如果点击有效
        if(s<R*1.1){
            bubble.state=bubble.state ? false : true;
            for(var j=0;j<len;j++){
                if(myGame.bubbles[j].state&& j != i){
                    //加起来
                    setTimeout(myGame.move,100,i,j);
                    //myGame.combine(i,j);
                    
                    //break;
                }
            }
            break;
        }
    }
}

function createBubble(){
    var r=genRandom(0,1);
    
    var bubble = {
        x : genRandom(R,width-R),
        
        y : height+R,
        num : genRandom(1,WINSCORE/2),
        //num : myGame.bubbles.length,
        state : false,
        onUpdate : function(deltaTime,game){
            //this.speedY = genRandom(0,100);
            this.speedY = 50;
        },
        currentAnim : "move",
    };
    for(var i=0,len=myGame.bubbles.length;i<len;i++){
        var temp = myGame.bubbles[i];
        if(temp.y+D<bubble.y)
            continue;
        if((bubble.x>temp.x-D)&&(bubble.x<temp.x+D)){
            i=-1;
            bubble.x = genRandom(R,width-R);
        }
    }
    return bubble;
}

var myGame= new Game({
        FPS : 50 ,
        map : "bg" ,
        width : 600 ,
        height : 400,
        onInit : function(){
            this.timenum=$("timenum");
            this.score=$("score");
        },
        beforeUpdate : function(deltaTime){
            // for(var i=0,len=this.bubbles.length;i<len;i++){
                // var bubble=this.bubbles[i];
                ///////////////
            // }
            if(this.timer.remain<=0){
                var i=localStorage.length;
                if(score){
                    if(i){
                        var temp=JSON.parse(localStorage.getItem(i));
                        if(score>=temp.score)
                            alertWin('恭喜进入英雄榜','',300,150);
                    }else{
                        alertWin('恭喜进入英雄榜','',300,150);
                    }
                }
                //var c=confirm("Your score : "+this.score.innerHTML+"\n Try again?");
                this.stop();
                // if(c){
                    // window.location.reload();
                // }
                return false;
            }

            var d=this.timer.remain/1000;
            this.timenum.innerHTML=d.toFixed(1);
            this.score.innerHTML= score;

        },

        move : function(i,j){
            
            var n=40;
            var bubblei = myGame.bubbles[i];
            var bubblej = myGame.bubbles[j];
            if(!(bubblei.state&&bubblej.state))
                return;
            bubblei.x =  bubblei.x*(n-1)/n + bubblej.x/n  ;
            bubblei.y =  bubblei.y*(n-1)/n + bubblej.y/n ;
            bubblej.x =  bubblej.x*(n-1)/n + bubblei.x/n  ;
            bubblej.y =  bubblej.y*(n-1)/n + bubblei.y/n ;
            var xdiff=bubblei.x-bubblej.x,
                  ydiff=bubblei.y-bubblej.y,
                  s = Math.pow((xdiff*xdiff+ydiff*ydiff),0.5);
            if(s>D){
                setTimeout(myGame.move,100/n,i,j);
            }else{
                myGame.combine(i,j);
            }
        },
        combine : function( i , j ){
            var bubble = this.bubbles[i];
            var temp = this.bubbles[j];
            bubble.x = ( bubble.x + temp.x )/2;
            bubble.y = ( bubble.y + temp.y )/2;
            bubble.num = bubble.num + temp.num;
            
            bubble.state = false;
            temp.state = false;
            for(var el in this.bubbles){
                if(this.bubbles[el].state){
                    bubble.state = true;
                    break;
                }
            }
            this.changeBubble(i,bubble);
            this.changeBubble(j);
            
            checkWin();
        },
        bubbles : [
        ]
});





