
let time = {};

/**
 * @return {string}
 */
time.CurrentTime = function()
{
    let now = new Date();

    let year = now.getFullYear();       //年
    let month = now.getMonth() + 1;     //月
    let day = now.getDate();            //日

    let hh = now.getHours();            //时
    let mm = now.getMinutes();          //分
    let ss = now.getSeconds();          //分

    let clock = year + "-";

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + " ";

    if(hh < 10)
        clock += "0";
    clock += hh + ":";

    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;

    return(clock);
}
/**
 * @return {string}
 */
time.ToDay = function()
{
    let now = new Date();

    return(time.GetDay(now));
}

time.Tomorrow = function()
{
    let now = new Date();
    now.setDate(now.getDate()+1)

    return(time.GetDay(now));
}


/**
 * @return {string}
 */
time.GetDay = function(timet)
{
    let year = timet.getFullYear();       //年
    let month = timet.getMonth() + 1;     //月
    let day = timet.getDate();            //日

    let hh = timet.getHours();            //时
    let mm = timet.getMinutes();          //分
    let ss = timet.getSeconds();          //分

    let clock = year + "-";

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + " 00:00:00";

    return(clock);
}
module.exports = time;