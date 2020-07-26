import React from 'react';
export const formattedDateTime = () => {
  var day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  var month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let date = new Date();
  let hour = date.getHours() < 12 ? date.getHours() : date.getHours() - 12;
  let mm = '';
  let meridiem = date.getHours() < 12 ? 'AM' : 'PM';
  date.getMinutes() < 10
    ? (mm = '0' + date.getMinutes())
    : (mm = date.getMinutes());

  return (
    <div>
      <span className='time'>{hour + ':' + mm} </span>
      <span className='meridiem'>{meridiem}</span> <br />
      {day[date.getDay()] +
        ', ' +
        month[date.getMonth()] +
        ' ' +
        date.getDate()}
    </div>
  );
};
