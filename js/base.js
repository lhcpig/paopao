var point = {
    x : 0,
    y : 0,
    state : false
}
var R=30;
var D=60;
var WINSCORE=6;
var score=0;
var grandY = 344 ;
var acceY = 1.0/1000;
var width = 600;
var height =400;
var player={rank:"0",name:"",score:"0"};
function test(){
    player.name="2w";
    player.rank=1;
    player.score=62;
    //localStorage.setItem(player.rank,JSON.stringify(player));
    //var a=JSON.parse(localStorage.getItem(1));
    //var b=a.rank+33;
    //var a=localStorage.getItem(1);
    //localStorage.setItem(2,a);
    //alert(b);
    myGame.addToHeroes(player.name);
}
function initHeroes(){
    for(var i=1;i<=localStorage.length;i++){
        //var a=i.toString();
        player = JSON.parse(localStorage.getItem(i));
        $(i.toString()).innerHTML=i + "       " +player.score + "      " + player.name;
    }
}
function save(){
    var name=$("modalName").value;
    if(name=="")
        return;
        
    document.body.removeChild($("bgdialog"));
    document.body.removeChild($("msgdialog"));
    myGame.addToHeroes(name);
    initHeroes();
    
}


function loadImage(srcList){
    var imgs={};
    for (var i=0;i<srcList.length;i++){
        var img=srcList[i];
        imgs[img.id]=new Image();       
        imgs[img.id].src=img.url;       
    }
    return imgs;
}

function $(id){
    return document.getElementById(id);
}

function genRandom(lower, higher) {
    lower = lower || 0;
    higher = higher || 9999;
    return Math.floor( (higher - lower + 1) * Math.random() ) + lower;
}
function merger(so, po,override) {
    if (arguments.length<2 || po === undefined ) {
        po = so;
        so = {};
    }
    for ( var key in po) {
        if ( !(key in so) || override!==false ) {
            so[key] = po[key];
        }
    }
    return so;
}



function beforeInit(){
        WINSCORE = $("winscore").valueAsNumber;
        score = 0;
        if(!(WINSCORE>=6&&WINSCORE<=100)){
            alert("请输入有效的数字");
             return false;
        }
        WINSCORE = Math.round(WINSCORE);
        return true;
}

function noop(){

}
function cancleFull(){
        if (document.webkitIsFullScreen) {                     // document.webkitIsFullScreen
            //已经是全屏
        } else {
            myGame.bubbles=[];
            for(var i=0;i<5;i++){
                myGame.addBubble();
            }
        width = 600;
        height =400;
        
        myGame.container.style.width = width + "px";
        myGame.container.style.height = height + "px";
        myGame.canvas.width = width;
        myGame.canvas.height = height;
        }

}
function initEvent(){
    // document.addEventListener("onclick",function(evt){
        // point.x = evt.layerX;
        // point.y = evt.layerY;
        // point.state = true;
    // },false);
    var canvas=$("c");
    canvas.addEventListener("click",updateClick,false);
    var fs=$("fs");
    fs.addEventListener("webkitfullscreenchange", cancleFull, false);
}