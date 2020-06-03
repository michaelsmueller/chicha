import zxcvbn from 'zxcvbn';

export const isValidEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

export const getPasswordStrength = (password) => {
  return zxcvbn(password).score;
}

export const isValidFbEvent = (url) => {
  if (getFbBaseUrlIndex(url) === -1) return false
  else {
    const fbEventId = getFbEventId(url);
    const numDigits = fbEventId.length;
    if (numDigits === 15 || numDigits === 16) return true;
    else return false;
  }
}

export const getFbEventId = (url) => {
  const eventIdString = fbEventIdString(url);
  const fbEventId = eventIdString.match(/\d+/)[0];
  return fbEventId;
}

const fbEventIdString = (url) => {
  const baseUrlIndex = getFbBaseUrlIndex(url);
  return url.slice(baseUrlIndex + 20);
}

const getFbBaseUrlIndex = (url) => url.search('facebook.com/events/');
