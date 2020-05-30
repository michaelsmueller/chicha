import { isToday, isThisWeek, isThisWeekend } from './dateTime';

export const filterEvents = (events, filterBy) => {
  const filteredEvents = [];
  events.forEach((event) => {
    if (passesFilter(event, filterBy)) filteredEvents.push(event);
  });
  return filteredEvents;
};

const passesFilter = (event, filterBy) => {
  const startDate = new Date(event.data?.start_time);
  switch (filterBy) {
    case 'today': return isToday(startDate);
    case 'this-week': return isThisWeek(startDate);
    case 'this-weekend': return isThisWeekend(startDate);
    default: return true;
  }
};
