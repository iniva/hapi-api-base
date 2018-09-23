// Times are expressed in seconds
/* eslint-disable no-magic-numbers */
export const SECOND = 1;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
export const MONTH = DAY * 30;
export const YEAR = MONTH * 12;
export const toMilliseconds = time => Number(time) * 1000;
/* eslint-enable no-magic-numbers */
