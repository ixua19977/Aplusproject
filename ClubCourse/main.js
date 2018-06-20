$(document).ready(function() {
    $("#courseTable").append("<tr><th>場次<th><th>時間<th><th>主題<th><tr>");
    //tr=table row 排 th= table head 
    var topicCount = topic.length;
    
    var seoundUnit = 1000;
    var minuteUnit = seoundUnit*60;
    var hourUnit = minuteUnit*60;
    var dayUnit = hourUnit*24;
    
    
    for(var x=0;x<topicCount;x++)    //x=x+1 => x++
    {
        $("#courseTable").append("<tr>");
        $("#courseTable").append("<td>"+(x+1)+"</td>");  //td=table data cell
        $("#courseTable").append("<td>"+(new Date((startDate.getTime()+x*7*dayUnit))).toLocaleDateString()+"</td>");    
        $("#courseTable").append("<td>"+topic[x]+"</td>");
        $("#courseTable").append("</tr>");
    }    
});
    