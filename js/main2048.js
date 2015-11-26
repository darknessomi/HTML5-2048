var board = new Array();
var score = 0;
var hasConflicted = new Array();
var winOnce = false;
$(document).ready(function(){
    //加载调用的方法
    prepareForMobile();
    newgame();
    hideDialog();
});

function hideDialog(){
    $(".dialog-success").css("display","none");
    $(".dialog-fail").css("display","none");
}

function prepareForMobile(){
    if(isPC()){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }
    $("#grid-container").css('width',gridContainerWidth-2*cellSpace);
    $("#grid-container").css('height',gridContainerWidth-2*cellSpace);
    $("#grid-container").css('padding',cellSpace);
    $("#grid-container").css('border-radius',0.02*gridContainerWidth);
    if(documentHeight*3/documentWidth>5){
        $('header').css('margin-top',cellSideLength);
    }
    $(".grid-cell").css("width",cellSideLength);
    $(".grid-cell").css("height",cellSideLength);
    $(".grid-cell").css("border-radius",0.02*cellSideLength);
}

function newgame(){
    //初始化棋盘
    init();
    //随机生成两个数字
    generateOneNumber();
    generateOneNumber();
    resetSocre();
}

function again(){
    newgame();
    hideDialog();
    resetSocre();
}

function conti(){
    hideDialog();
}

function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
        }
    }
    for(var i=0;i<4;i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j=0;j<4;j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    winOnce = false;
    score = 0;
    updateBoardView();
}

function updateBoardView(){
    //移除class为number-cell的元素
    $(".number-cell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            //append方法在元素的内部结尾添加代码
            $("#grid-container").append('<div class = "number-cell" id = "number-cell-'+i+'-'+j+'"></div>');
            //取得id为number-cell-i-j的元素
            var theNumberCell = $('#number-cell-'+i+"-"+j);
            
            if(board[i][j]==0){
                theNumberCell.css("width","0px");
                theNumberCell.css("height","0px");
                theNumberCell.css("top",getPosTop(i,j)+cellSideLength/2);
                theNumberCell.css("left",getPosLeft(i,j)+cellSideLength/2);
            }else{
                theNumberCell.css("width",cellSideLength+"px");
                theNumberCell.css("height",cellSideLength+"px");
                theNumberCell.css("top",getPosTop(i,j));
                theNumberCell.css("left",getPosLeft(i,j));
                theNumberCell.css("background-color",getNumberCellBgColor(board[i][j]));
                theNumberCell.css("color",getNumberCellFontColor(board[i][j]));
                theNumberCell.css("font-size",getNumberCellFontSize(board[i][j]));
                //改变元素的内部文本内容
                theNumberCell.text(board[i][j]);
            }
            
            hasConflicted[i][j] = false;
        }
    }
    $('.number-cell').css('line-height',cellSideLength+"px");
    
}

function generateOneNumber(){
    if(nospace(board)){
        return false;
    }
    //随机找到一个位置
    var randomX = parseInt(Math.floor(Math.random()*4));
    var randomY = parseInt(Math.floor(Math.random()*4));
    
    while(true){
        if(board[randomX][randomY]==0){
            //证明当前位置可用
            break;
        }
        var randomX = parseInt(Math.floor(Math.random()*4));
        var randomY = parseInt(Math.floor(Math.random()*4));
    }
    //随机生成一个数字
    var randomNumber = Math.random()<0.5?2:4;
    //显示随机数字
    board[randomX][randomY] = randomNumber;
    showNumberWithAnimation(randomX,randomY,randomNumber);
    
    return true;
}

$(document).keydown(function (event) {
  
  switch (event.keyCode) {
    case 37: //左
      event.preventDefault();
      if(moveLeft()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
      break;
    case 38: //上
      event.preventDefault();
      if(moveUp()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
      break;
    case 39: //右
      event.preventDefault();
      if(moveRight()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
      break;
    case 40: //下
        event.preventDefault();
        if(moveDown()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
      break;
    default:
      return; 
  }
});

document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchmove',function(event){
    event.preventDefault();
});

document.addEventListener('touchend',function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;
    
    var deltax = endx - startx;
    var deltay = endy - starty;
    
    if(Math.abs(deltax) <0.2*documentWidth&& Math.abs(deltay)<0.2*documentWidth){
        return;
    }
    
    if(Math.abs(deltax) >= Math.abs(deltay)){
        if(deltax > 0){
            //向右
            if(moveRight()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
        }else{
            //向左
            if(moveLeft()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
        }
    }else{
        if(deltay > 0){
            //向下
            if(moveDown()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
        }else{
            //向上
            if(moveUp()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
        }
    }
});

function isGameover(){
    if(nospace(board)&&nomove(board)){
        gameover();
    }
}

function isWin(){
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j]==2048){
                if(winOnce==false){
                    win();
                    winOnce=true;
                }
            }
        }
    }
    return false;
}

function win(){
    $(".dialog-success").css("display","block");
}

function gameover(){
    $(".dialog-fail").css("display","block");
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j]!=0){
            //不等于0说明可能向右移动
                for(var k=0;k<i;k++){
                    if(board[k][j]==0&&noUpBlock(i,j,k,board)){
                        //可以移动
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[k][j]==board[i][j]&&noUpBlock(i,j,k,board)&&!hasConflicted[k][j]){
                        //可以移动
                        //两数相加
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //加分
                        score += board[k][j];
                        setTimeout("changeScore(score)",310);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0){
            //不等于0说明可能向右移动
                for(var k=3;k>i;k--){
                    if(board[k][j]==0&&noDownBlock(i,j,k,board)){
                        //可以移动
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[k][j]==board[i][j]&&noDownBlock(i,j,k,board)&&!hasConflicted[k][j]){
                        //可以移动
                        //两数相加
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //加分
                        score += board[k][j];
                        setTimeout("changeScore(score)",310);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
            //不等于0说明可能向右移动
                for(var k=3;k>j;k--){
                    if(board[i][k]==0&&noRightBlock(i,j,k,board)){
                        //可以移动
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[i][k]==board[i][j]&&noRightBlock(i,j,k,board)&&!hasConflicted[i][k]){
                        //可以移动
                        //两数相加
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //加分
                        score += board[i][k];
                        setTimeout("changeScore(score)",310);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
            //不等于0说明可能向左移动
                for(var k=0;k<j;k++){
                    if(board[i][k]==0&&noLeftBlock(i,j,k,board)){
                        //可以移动
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[i][k]==board[i][j]&&noLeftBlock(i,j,k,board)&&!hasConflicted[i][k]){
                        //可以移动
                        //两数相加
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //加分
                        score += board[i][k];
                        setTimeout("changeScore(score)",310);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}


function showNumberWithAnimation(randomX,randomY,randomNumber){
    var numberCell = $("#number-cell-"+randomX+"-"+randomY);
    //添加新的数字
    numberCell.css("background-color",getNumberCellBgColor(board[randomX][randomY]));
    numberCell.css("color",getNumberCellFontColor(board[randomX][randomY]));
    numberCell.css("font-size",getNumberCellFontSize(randomNumber));
    numberCell.text(randomNumber);
    
    //animate函数第一个参数是CSS样式，第二个参数是时间
    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(randomX,randomY),
        left:getPosLeft(randomX,randomY)
    },100);
    
}

function showMoveAnimation(fromX,fromY,toX,toY){
    var numberCell = $("#number-cell-"+fromX+"-"+fromY);
    numberCell.animate({
        top:getPosTop(toX,toY),
        left:getPosLeft(toX,toY)
    },200);
}

function changeScore(score){
    $("#score").text(score);
}

function resetSocre(){
    $("#score").text(0);
}

documentWidth = window.screen.width;
documentHeight = window.screen.height;
gridContainerWidth = 0.92*documentWidth;
cellSideLength = 0.18*documentWidth;
cellSpace = 0.04*documentWidth;


function getPosTop(i,j){
    return cellSpace+i*(cellSpace+cellSideLength);
}

function getPosLeft(i,j){
    return cellSpace+j*(cellSpace+cellSideLength);
}

function getNumberCellBgColor(number){

    switch(number){
        case 2:return "#eee4da"; break;
        case 4:return "#ede0c8"; break;
        case 8:return "#f2b179"; break;
        case 16:return "#f59563"; break;
        case 32:return "#f67c5f"; break;
        case 64:return "#ec6544"; break;
        case 128:return "#e44d29"; break;
        case 256:return "#edcf72"; break;
        case 512:return "#c8a145"; break;
        case 1024:return "#a8832b"; break;
        case 2048:return "#86aa9c"; break;
        case 4096:return "#a6c"; break;
        case 8192:return "#791e6f"; break;
    }
    return "black";
    
}

function isPC() {
    var system = {
        win : false,
        mac : false,
        xll : false
    };
    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    //跳转语句
    if (system.win || system.mac || system.xll) { //转向电脑端
        return true; //是电脑
    } else {
        return false; //是手机
    }
}

function isMobile() {  
    var regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;  
    var u = navigator.userAgent;  
    if (null == u) {  
        return true;  
    }  
    var result = regex_match.exec(u);  
    if (null == result) {  
        return false  
    } else {  
        return true  
    }  
}  

function getNumberCellFontSize(number){
    if(number <= 64){
        return 0.6*cellSideLength+"px";
    }else if(number <= 512){
        return 0.5*cellSideLength+"px";
    }else if(number <=8192){
        return 0.4*cellSideLength+"px";
    }else{
        return 0.3*cellSideLength+"px";
    }
    return "white";
}

function getNumberCellFontColor(number){
    if(number <= 4){
        return "#776e65";
    }
    return "white";
}

function nospace(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0){
                return false;
            }
        }
    }
    return true;
}

function nomove(board){
    if(canMoveLeft()||canMoveDown()||canMoveRight()||canMoveUp()){
        return false;
    }
    return true;
}

function canMoveLeft(){
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(){
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                if(board[i][j+1]==0||board[i][j+1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(){
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j]!=0){
                if(board[i-1][j]==0||board[i-1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(){
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0){
                if(board[i+1][j]==0||board[i+1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function noLeftBlock(i,j,k,board){
    for(var m=k+1;m<j;m++){
        if(board[i][m]!=0){
            return false;
        }
    }
    return true;
}
function noRightBlock(i,j,k,board){
    for(var m=k-1;m>j;m--){
        if(board[i][m]!=0){
            return false;
        }
    }
    return true;
}
function noDownBlock(i,j,k,board){
    for(var m=k-1;m>i;m--){
        if(board[m][j]!=0){
            return false;
        }
    }
    return true;
}
function noUpBlock(i,j,k,board){
    for(var m=k+1;m<i;m++){
        if(board[m][j]!=0){
            return false;
        }
    }
    return true;
}
