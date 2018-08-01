// Times are expressed in seconds
/* eslint-disable no-magic-numbers */
const SECOND = 1;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = MONTH * 12;
const toMilliseconds = time => Number(time) * 1000;
/* eslint-enable no-magic-numbers */

export const Time = {
    SECOND,
    MINUTE,
    HOUR,
    DAY,
    MONTH,
    YEAR,
    toMilliseconds
};
