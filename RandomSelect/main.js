$(document).ready(function() {
    $("input").click(function()
    {
        var numberOfListItem = $("#choices li").length;
        var randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        //新增"choices" 讓頁面只會抓到choices下面的選項 不會選到選單項目
        $("H1").text($("#choices li").eq(randomChildNumber).text());
    });
});

//顯示html的第一個選項: $("H1").text($("li:first").text())
//最後一個:last
//中間那個:"li".eq(1)

//隨機變數? 先計算參加變數比賽的有幾個? 產生對應的亂數範圍 結果顯示不是123而是這個亂數
//1. var number of list item = $("li").length
//2. var random child number = math.floor(math.random()*numberofthelistitem)
//3. $("H1").text($("li").eq(randomChildNumber).text());
