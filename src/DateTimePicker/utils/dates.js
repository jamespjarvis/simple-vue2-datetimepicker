const months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const weekdaysShort = [
  "SUN",
  "MON",
  "TUES",
  "WED",
  "THURS",
  "FRI",
  "SAT"
];

export const isDate = date => {
  return !!date && !isNaN(new Date(date).getTime());
};

export const getClearHoursTime = time => {
  const temp = new Date(time);
  temp.setHours(0, 0, 0, 0);
  return temp.getTime();
};

export const nextDate = (date, offset = 1) => {
  if (isDate(date)) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + offset
    );
  }
  throw new Error(`nextDate: 1st parameter may be not a valid date`);
};

export const nextMonth = (date, offset = 1) => {
  if (isDate(date)) {
    return new Date(
      date.getFullYear(),
      date.getMonth() + offset,
      date.getDate()
    );
  }
  throw new Error(`nextMonth: 1st parameter may be not a valid date`);
};

export const nextYear = (date, offset = 1) => {
  if (isDate(date)) {
    return new Date(
      date.getFullYear() + offset,
      date.getMonth(),
      date.getDate()
    );
  }
  throw new Error(`nextYear: 1st parameter may be not a valid date`);
};

export const isSameDay = (date1, date2) => {
  if (isDate(date1) && isDate(date2)) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  throw new Error(`isSameDay: 1st or 2nd parameter may be not a valid date`);
};
export const isLeapYear = year => {
  if (isNaN(year)) {
    return false;
  }
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const getDaysOfMonth = (year, month) => {
  if (isNaN(year) || isNaN(month)) {
    throw new Error(`daysOfMonth: parameter's value may be not a number`);
  }
  if ([4, 6, 9, 11].includes(month)) {
    return 30;
  }
  return month === 2 ? (isLeapYear(year) ? 29 : 28) : 31;
};

export const getDayName = d => {
  return weekdays[d.getDay()];
};

export const getMonthName = (d, locale = "en-US") => {
  return new Intl.DateTimeFormat(locale, { month: "long" }).format(d);
};

export const formatDate = d => {
  if (isDate(d)) {
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const day = weekdays[d.getDay()];
    return `${day.substr(0, 3)}, ${month.substr(0, 3)}. ${date}, ${year}`;
  }
  throw new Error(`formatDate: parameter's value is not a date`);
};

export const formatTime = (
  d,
  options = {
    minutes: true
  }
) => {
  const hours = (h => (h > 12 ? h - 12 : h))(d.getHours());
  const ampm = (h => (h > 12 ? "PM" : "AM"))(d.getHours());
  const minutes = options.minutes ? `:${d.getMinutes()}` : "";
  return `${hours ? hours : 12}${minutes} ${ampm}`;
};

export const getFirstDateOfMonth = date => {
  if (isDate(date)) {
    const temp = new Date(date.getTime());
    temp.setDate(1);
    temp.setHours(0, 0, 0, 0);
    return temp;
  }
  throw new Error(`getFirstDateOfMonth: 1st parameter may be not a valid date`);
};

export const getLastDateOfMonth = date => {
  if (isDate(date)) {
    const temp = new Date(date.getTime());
    const daysOfMonth = getDaysOfMonth(temp.getFullYear(), temp.getMonth() + 1);
    temp.setDate(daysOfMonth);
    temp.setHours(23, 59, 59, 999);
    return temp;
  }
  throw new Error(`getLastDateOfMonth: 1st parameter may be not a valid date`);
};

export const chunk = (arr, size) =>
  Array.from(
    {
      length: Math.ceil(arr.length / size)
    },
    (v, i) => arr.slice(i * size, i * size + size)
  );

export const initialize2DArray = (w, h, val = null) =>
  Array.from({
    length: h
  }).map(() =>
    Array.from({
      length: w
    }).fill(val)
  );

export const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

export const initializeArrayWithRange = (end, start = 0, step = 1) =>
  Array.from({
    length: Math.ceil((end + 1 - start) / step)
  }).map((v, i) => i * step + start);

export const minutes = initializeArrayWithRange(55, 0, 5);

export const hours = initializeArrayWithRange(12, 1);
export const militaryHours = initializeArrayWithRange(24, 1);
