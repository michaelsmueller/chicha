const formatToString = (date) => {
  try {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
    const dateTimeFormat = new Intl.DateTimeFormat('en', options);  
    const [{ value: month },,{ value: day },,{ value: year },,{ value: hour },,{ value: minute }] = dateTimeFormat.formatToParts(date);
    return `${year}-${month}-${day}T${hour}:${minute}`;
  } catch(error) {
    return error;
  }
}

export const getLocalDateTime = (utcDateTime) => {
  try {
    const date = new Date(utcDateTime);
    if (isValidDate(date)) return formatToString(date);
    else return '';
  } catch (error) {
    return error;
  }
}

export const getUtcDateTime = (localDateTime) => {
  try {
    const date = new Date(localDateTime);
    if (isValidDate(date)) return date.toISOString();
    else return '';
  } catch (error) {
    return error;
  }
}

export const showLocalDateTime = (utcDateTime) => {
  try {
    const date = new Date(utcDateTime);
    if (isValidDate(date)) return date.toString().replace(/:\d{2}\sGMT.*/g, '');
    else return '';
  } catch (error) {
    return error;
  }
}

const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
}
