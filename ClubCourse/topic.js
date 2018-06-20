var topic = [
    "下雨了 不去了",
    "國定假日 不開了",
    "深蹲0kg*15-10-8",
    "深蹲受傷 不能了",
    "二頭三頭 8lb*10*3"
];

var startDate = new Date();

function setMonthAndDate(startMonth,stratDate)
{
    startDate.setMonth(startMonth-1); //()內是人輸入的東西
    //java script的設定為 月份從0(一月)開始到11(十二月)，因此需再處理。 日期則從1到31
    startDate.setDate(stratDate);
    startDate.setHours(0);  //不討論 所以是0
    startDate.setMinutes(0);
    startDate.setSeconds(0)
}

setMonthAndDate(4,29);