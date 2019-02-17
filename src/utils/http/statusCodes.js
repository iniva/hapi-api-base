import { STATUS_CODES } from 'http';

const STATUSES = {};
const CODES = {};

Object.entries(STATUS_CODES).forEach(([code, status]) => {
  const statusText = status
    .toUpperCase()
    .replace(/\s+/g, '_')
    .replace(/-+/g, '_');

  STATUSES[statusText] = Number(code);
  CODES[Number(code)] = status;
});

export {
  STATUSES,
  CODES,
};
