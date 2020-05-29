const formatToString = (date) => {
  try {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
    const dateTimeFormat = new Intl.DateTimeFormat('en', options);  
    const [{ value: month },,{ value: day },,{ value: year },,{ value: hour },,{ value: minute }] = dateTimeFormat.formatToParts(date);
    return `${year}-${month}-${day}T${hour}:${minute}`;
  } catch(error) {
    return error;
  }
};

export const getLocalDateTime = (utcDateTime) => {
  try {
    const date = new Date(utcDateTime);
    if (isValidDate(date)) return formatToString(date);
    else return '';
  } catch (error) {
    return error;
  }
};

export const getUtcDateTime = (localDateTime) => {
  try {
    const date = new Date(localDateTime);
    if (isValidDate(date)) return date.toISOString();
    else return '';
  } catch (error) {
    return error;
  }
};

export const showLocalDateTime = (utcDateTime) => {
  try {
    const date = new Date(utcDateTime);
    if (isValidDate(date)) return date.toString().replace(/:\d{2}\sGMT.*/g, '');
    else return '';
  } catch (error) {
    return error;
  }
};

const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

export const isToday = (date) => {
  try {
    if (isValidDate(date)) {
      const today = new Date();
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      );
    } else throw new Error('invalid date passed as parameter');
  } catch (error) {
    return error;
  }
};

export const isThisWeek = (date) => {
  try {
    if (isValidDate(date)) {
      const week = getWeek();
      let dateInWeek = false;
      for (const weekDay of week) if (areOnSameDay(date, weekDay)) dateInWeek = true;
      return dateInWeek;
    } else throw new Error('invalid date passed as parameter');
  } catch (error) {
    return error;
  }
};

export const isThisWeekend = (date) => {
  try {
    if (isValidDate(date)) {
      const weekend = getWeekend();
      let dateInWeekend = false;
      for (const weekendDay of weekend) if (areOnSameDay(date, weekendDay)) dateInWeekend = true;
      return dateInWeekend;
    } else throw new Error('invalid date passed as parameter');
  } catch (error) {
    return error;
  }
};

const getWeek = () => {
  const week = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date();
    day.setDate(day.getDate() + i);
    week.push(day)
  }
  return week;
};

const getWeekend = () => {
  const weekend = [];
  for (let i = 5; i <= 7; i++) {
    const day = new Date();
    const offset = i - day.getDay();
    if (offset >= 0) {
      day.setDate(day.getDate() + offset);
      weekend.push(day);
    }
  }
  return weekend;
};

const areOnSameDay = (date1, date2) => {
  try {
    if (isValidDate(date1) && isValidDate(date2)) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    } else throw new Error('invalid date passed as parameter');
  } catch (error) {
    return error;
  }
};
