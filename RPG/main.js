var mapArray, ctx, currentImgMainX, currentImgMainY;
//遊戲中每個格子的元素 //context //決定主角要走去哪 xy座標
var imgMountain, imgMain, imgEnemy;
//到處都會使用到的東西 所以打在最前面 #全劇變數

//一開始網頁元件載入後要做的事情 document:ready
$(document).ready(function() {
    //0可以走 1障礙 2終點 3敵人
    //九宮格 (0,0)(200,0)(400,0)           canvas的原點在左上角   0,1,1
    //      (0,200)(200,200)(400,200)                          0,0,0
    //      (0,400)(200,400)(400,400)                          3,1,2
    mapArray = [0,1,1,0,0,0,3,1,2]; 
    ctx = $("#myCanvas")[0].getContext("2d");  //$ jquery 專用語法 //呼叫context告訴她只是一般2D的平面繪圖
   
    imgMain = new Image(); //目前主角所在的位子
    imgMain.src = "images/kramer_sprites.png";  //source 
    currentImgMainX = 0;
    currentImgMainY = 0; 
    imgMain.onload = function() //下載and then 開始function
    {
        ctx.drawImage(imgMain,0,0,116,195,currentImgMainX,currentImgMainY,200,200); //x,y,寬加多少,高加多少
    }
        
        imgMountain = new Image();
        imgMountain.src = "images/material.png";
        imgEnemy = new Image();
        imgEnemy.src = "images/WalkingGirl.png";
        imgMountain.onload = function(){
            imgEnemy.onload = function(){
                for(var x in mapArray)
                    {
                        if(mapArray[x]==1) //遇到1 就擺障礙物 
                            {
                                 ctx.drawImage(imgMountain,0,155,32,32,x%3*200,Math.floor(x/3)*200,200,200)
                            }                                      //調整比例才能配合圖大小 %3格 *200/格的長度
                        else if (mapArray[x]==3)  //擺上敵人 在3  
                            {                     //前面兩個數字 是左上角 後面兩個數字 是移動多少
                                ctx.drawImage(imgEnemy,0,0,604,697,x%3*200,Math.floor(x/3)*200,200,200);
                            }
                   
                     }
        };};
});
    
//有人按下按鈕後要做甚麼事 document:keydown
$(document).keydown(function(event){
    var targetImgMainX, targetImgMainY, targetBlock, cutImangePositionX;
    //targetImgMainX 主角即將移動過去的目標位置 
    //cutImangePositionX 依據主角朝向的方向 而決定圖片
                      
    //targetBlock 主角要移動過去那一格的編號 (但好像沒有用到˙ㄥ˙)
    event.preventDefault();
    //避免使用者點擊 而出現其他行為
    
    //alert(event.which); 試試看前面設定有無成功？　如果有會跳出alert小視窗　
    
    switch(event.which){　//switch "選擇"狀況來做事情　
        case 37: //左  //j query語法裡面 上下左右的代號是37 38 39 40 
            targetImgMainX = currentImgMainX-200;
            targetImgMainY = currentImgMainY;
            cutImangePositionX = 131;    //因為這次的圖形是長條的 只有x改變 y不改變 所以只有x
            break;
        case 38://上
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY-200;
            cutImangePositionX = 280;
            break;        
        case 39://右
            targetImgMainX = currentImgMainX+200;
            targetImgMainY = currentImgMainY;
            cutImangePositionX = 440;
            break;        
        case 40://下
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY+200;
            cutImangePositionX = 0;
            break;
        default: //如果按其他按鍵 
            return; //回復原狀=不理他
            
    }
    //走上下左右 調整xy 阿如果跳出地圖怎麼辦?
    if(targetImgMainX>=0 && targetImgMainX<=400 &&
      targetImgMainY<=400 && targetImgMainY>=0) //沒有超出邊界
    {
        targetBlock=targetImgMainX/200+targetImgMainY/200*3;
        // 012   4號方格=(200,200)
        // 345         =200/200+200/200*3
        // 678         =1+3   (師曰:這裡已經幫你們算好公式了˙ㄙ˙)
    }else
    {
        targetBlock=-1; 
    }
    //確認要去的地方後 把主角原來的位子清空
    ctx.clearRect(currentImgMainX,currentImgMainY,200,200); //clearrectangle 清空方格
    if(targetBlock==-1 || mapArray[targetBlock]==1 || mapArray[targetBlock]==3)//== 等於 判斷
        { //-1就不在maparray裡面
          //就...沒動作?? 
          //沒錯!!!在"清空"的標題下 遇到障礙物(1)敵人(3)就不清空=沒動作
        }else
            {
                $("#talkBox").text("");
                currentImgMainX = targetImgMainX;
                currentImgMainY = targetImgMainY;   
            }
    ctx.drawImage(imgMain,cutImangePositionX,0,120,197,currentImgMainX,currentImgMainY,200,200);
   
    switch(mapArray[targetBlock])
        { //0可以走 1障礙 2終點 3敵人
            case undefined: //(為何這裡不寫-1 要寫undefined)
                $("#talkBox").text("哎呀,好痛～");
                break;
            case 1:
                $ ("#talkBox").text("我是很像便便的小石頭～");
                break;
            case 2:
                $ ("#talkBox").text("抵達終點～");
                break;
            case 3:
                $ ("#talkBox").text("嗨,細腿男～");
                break;
                
        }
 });   