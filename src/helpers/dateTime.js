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

const getLocalDateTime = (utcDateTime) => {
  try {
    const dateObject = new Date(utcDateTime);
    return formatToString(dateObject);
  } catch (error) {
    return error;
  }
}

const getUtcDateTime = (localDateTime) => {
  try {
    const dateObject = new Date(localDateTime);
    return dateObject.toISOString();
  } catch (error) {
    return error;
  }
}

module.exports = {
  getLocalDateTime,
  getUtcDateTime,
};
