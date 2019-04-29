/* 
const {
  getDayName,
  getMonthName,
  formatDate,
  formatTime,
  getDaysOfMonth,
  isLeapYear,
  getFirstDateOfMonth,
  getLastDateOfMonth,
  nextMonth,
  nextDate,
  getClearHoursTime,
  chunk,
  initialize2DArray,
  initializeArrayWithRange,
  deepFlatten,
  hours,
  minutes
} = require("./utils");

const initialize = (date = new Date()) => {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDate = date.getDate();
  const currentDay = date.getDay();

  const firstDateOfMonth = getFirstDateOfMonth(date);
  const firstWeekday = firstDateOfMonth.getDay();
  const daysOfMonth = getDaysOfMonth(currentYear, currentMonth + 1);
  const lastDateOfMonth = getLastDateOfMonth(date);
  const mod = (firstWeekday + 7) % 7;

  const displayStartDate = new Date(
    currentYear,
    currentMonth,
    firstDateOfMonth.getDate() - (mod + 7)
  );

  const minTime = firstDateOfMonth.getTime();
  const maxTime = lastDateOfMonth.getTime();

  const rows = initialize2DArray(7, 6);
  const displayRows = rows.map((r, i) => {
    return r.map((c, j) => {
      const index = i * 7 + j;
      const d = nextDate(displayStartDate, index);
      const time = d.getTime();
      const isToday = time === getClearHoursTime(Date.now());
      return {
        date: d,
        text: d.getDate(),
        type:
          time < minTime
            ? "prev-month"
            : time > maxTime
              ? "next-month"
              : "current-month",
        isToday
      };
    });
  });
  return displayRows;
};
*/
