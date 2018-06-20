//兵分兩路 開始作答與繼續作答 但，畫面上只有一顆按鈕？ 用==判斷
 
$(document).ready(function() {
    //目前作答狀況為空(null)=還沒開始答題
    //當按下按鈕後,要做的事情放在這裡
    var currentQuiz=null; 
    
    //為什麼按下按鈕 有些1.$document.ready(function()){}
    //$document.keydown(function()){}
    //有些是2. $document.(ready){$"#startButton"{}}
   //因為1.是在還沒按下按鈕之前 就要先放好很多東西(RPG裡面的敵人、小山、底圖)。 但是這裡是一開始只要放標題(還是style.css管的) 還有開始按鈕.所以從網頁開起(ready)到按下按鈕(keydown)之間沒有要預先設定的內容,兩者$合而為一
    //你說不用合,那請問「可以」不合併嗎？換言之,$(不是document)是啥意思啊?
    $("#startButton").click(function() //#後面接
    {
     //如果還沒開始作答(空null)就從這裡開始
        
        if(currentQuiz==null)
        {
            currentQuiz=0; //一般邏輯的第一題 電腦邏輯的第零題
           //顯示題目
            $("#question").text(questions[0].question);
            $("#options").empty();  //重新開始之後 會清空選項(最一開始可以不用打 可是當一回合結束時,要重新開始,這句話就便必要了)  
            
            for(var x=0;x<questions[0].answers.length;x++) //for是迴圈 題目有三個選項  //x++ x=x+1
            {
                $("#options").append("<input name='options' type='radio' value="+x+">"+"<label>"+questions[0].answers[x][0]+"</label><br><br>");
                //一次只能選一個的格式就叫radio (因為以前radio不能重複按數字...)
            }
        
            $("#startButton").attr("value","Next"); //attribute 屬性
        }
        
        else //如果已經開始作答就從這裡繼續
        {
            //請jquerry幫忙確認「有選到一個選項」
            $.each($(":radio"),function(i,val){ //i是索引值 可能是0號結果、1號結果、2號結果
                if(val.checked) 
                    //如果value.checked(網頁選項有被選)有設定的話 就會進行{}裡面的動作
                    {
                        //兵分二路:通往最終結果/跳向下一道題目
                        if(isNaN(questions[currentQuiz].answers[i][1]))
                        {
                            var finalResult = questions[currentQuiz].answers[i][1];
                            $("#question").text(finalAnswers[finalResult][0]);
                            $("#options").empty();
                            $("#options").append(finalAnswers[finalResult][1]+"<br><br>");
                            currentQuiz=null;
                            $("#startButton").attr("value","不滿意嗎,再試一次啊");
                        }
                        
                        
                        
                        else//顯示下一題
                        {
                            currentQuiz=questions[currentQuiz].answers[i][1]-1; 
                                   //目前這一題                   //把答案選項刪掉 不然會顯示上一題的答案選項
                        $("#question").text(questions[currentQuiz].question);
                            //清空選項區塊
                        $("#options").empty();
                            
                        for(var x=0;x<questions[currentQuiz].answers.length;x++) 
                        {
                            $("#options").append("<input name='options' type='radio' value="+x+">"+"<label>"+questions[currentQuiz].answers[x][0]+"</label><br><br>");
                        }
                            //alert("顯示下一題")  //跳出小框框 按確定才可以下一頁
                        }
                        return false;
                     };
            })}    
    
    });
});
    