/**
 * @method getMonthDates 获取当前日期所属月份的日期范围
 */
export const getMonthDates = date => {
  const curDate = new Date(date);
  let startDate = `${dateFormat(curDate, 'yyyy-MM')}-01`;
  let endDate = dateFormat(curDate, 'yyyy-MM');
  const days = new Date(parseInt(dateFormat(curDate, 'yyyy'), 10), parseInt(dateFormat(curDate, 'MM'), 10), 0).getDate();
  return {
    startDate,
    endDate: `${endDate}-${days}`
  };
}
/**
 * @method getMonthDate 获取距今第n月的日期范围
 */
export const getMonthDate = num => {
  var today = new Date();
  today.setMonth(today.getMonth() + num);
  var date = getMonthDates(today)
  return date
}
/**
 * @method getWeekDates 获取当前日期所属周的日期范围
 */
export const getWeekDates = date => {
  const dates = {
    startDate: '',
    endDate: ''
  };
  if (date) {
    const ms = 60 * 60 * 24 * 1000;
    const thisDayMs = new Date(date).getTime();
    const currentDay = new Date(date).getDay();
    const thisDay = currentDay === 0 ? 7 : currentDay;
    const startMs = currentDay === 1 ? (thisDayMs - (thisDay - 1) * ms) - 7 * ms : thisDayMs - (thisDay - 1) * ms;
    dates.startDate = `${fillZeroDate(new Date(startMs).getFullYear())}-${fillZeroDate(new Date(startMs).getMonth() + 1)}-${fillZeroDate(new Date(startMs).getDate())}`;
    dates.endDate = `${fillZeroDate(new Date(startMs + ms * 6).getFullYear())}-${fillZeroDate(new Date(startMs + ms * 6).getMonth() + 1)}-${fillZeroDate(new Date(startMs + ms * 6).getDate())}`;
  }
  return dates;
}
/**
 * @method getOneDate 获取距今第n天的日期
 * @param {*} gapDays 
 */
export const getOneDate = gapDays => {
  var today = new Date();
  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * gapDays;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码
  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = fillZeroDate(tMonth + 1);
  tDate = fillZeroDate(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
}
/**
 * @method getNowDate 获取当前时间
 */
export const getNowDate = () => {
  const curDate = new Date();
  let time = `${dateFormat(curDate, 'yyyy-MM-dd hh:mm:ss')}`;
  return time
}
/**
 * @method getOneTime 获取距今第n个小时时间
 */
export const getOneTime = (n) => {
  const date = new Date() - n * 1000 * 3600;
  const curDate = new Date(date);
  let time = `${dateFormat(curDate, 'yyyy-MM-dd hh:mm:ss')}`;
  return time
}
/**
 * @method getDiffDate 两日期之间的所有日期
 */
export const getDiffDate = (sdate, edate) => {
  let diffdate = [];
  let i = 0;
  while (sdate <= edate) {
    diffdate[i] = sdate;
    let stime = new Date(sdate).getTime();
    const next_time = stime + (1000 * 3600 * 24);
    let next_y = new Date(next_time).getFullYear();
    let next_m = new Date(next_time).getMonth();
    let next_d = new Date(next_time).getDate();
    next_m = fillZeroDate(next_m + 1);
    next_d = fillZeroDate(next_d);
    sdate = next_y + "-" + next_m + "-" + next_d;
    i++;
  }
  return diffdate
}

function fillZeroDate(num) {
  // 日期补零
  return Number(num) < 10 ? `0${num}` : num;
}

function dateFormat(date, format) {
  // 时间格式定义
  const data = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    "S+": date.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(
      RegExp.$1,
      String(date.getFullYear()).substr(4 - RegExp.$1.length)
    );
  }
  for (const k in data) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ?
        data[k] :
        ("00" + data[k]).substr(String(data[k]).length)
      );
    }
  }
  return format;
}
/**
 * @method translateSeconds 时间秒转换为00:00:00
 */
export const translateSeconds = (seconds) => {
  let time = Number(seconds) || 0;
  time = Math.round(time);
  let sec = time % 60;
  let min = Math.floor(time / 60 % 60);
  let h = Math.floor(time / 3600);
  sec = makeUpZero(sec);
  min = makeUpZero(min);
  h = makeUpZero(h);

  if (h === "00") {
    return `${min}:${sec}`
  } else {
    return `${h}:${min}:${sec}`
  }

  function makeUpZero(num) {
    let m = num;
    if (num.toString().length == 1) {
      m = "0" + num;
    }
    return m;
  }
}