var player;
//觸發youtube播放器
var currentPlay = 0;
//紀錄現在播到哪


//段一 當youtube API準備好
//API 別人寫好的頁面 臉書的叫Facebook IPA
//只要你照著下面的代碼打 就可以成功呼叫 打錯一個就不行
function onYouTubeIframeAPIReady(){
  
  player = new YT.Player("player",
        { 
          height:"390",
          width:"640",
          videoId:playList[currentPlay],
          playerVars:{
              "autoplay":0,
              "controls":0,
              "start":playTime[currentPlay][0],
              "end":playTime[currentPlay][1],
              "showinfo":0,
              "rel":0,
              "iv_load_policy":3
          },
      events:{
          "onReady":onPlayerReady,
          "onStateChange":onPlayerStateChange
      }
  });
}

//段二 當youtube播放器準備好時    
function onPlayerReady(event){
    $("#playButton").click(function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}

//段三 當播到指定的最後一秒時
function onPlayerStateChange(event){
    
    if(event.data == 1 &&
       (Math.floor(player.getCurrentTime())==playTime[currentPlay][1]))
    {   //如果還沒播到最後一首
            if(currentPlay < playList.length-1)
            {
               currentPlay++;
                player.loadVideoById({
                    "videoId":playList[currentPlay],
                    "startSeconds":playTime[currentPlay][0],
                    "endSeconds":playTime[currentPlay][1],
                    "suggestQuality":"large"
                });
            }else//已經播到最後一首
            {
               currentPlay=0;
                player.cueVideoById({
                    "videoId":playList[currentPlay],
                    "startSeconds":playTime[currentPlay][0],
                    "endSeconds":playTime[currentPlay][1],
                    "suggestedQuality":"large"
                });
            }
   }
   if(player.getVideoLoadedFraction()>0)
   { $("h2").text(player.getVideoData().title); }
}
   