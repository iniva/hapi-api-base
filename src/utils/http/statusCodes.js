import { STATUS_CODES } from 'http';

const statuses = {};
const codes = {};

for (const [code, status] of Object.entries(STATUS_CODES)) {
    const statusText = status
        .toUpperCase()
        .replace(/\s+/g, '_')
        .replace(/-+/g, '_');

    statuses[statusText] = Number(code);
    codes[Number(code)] = status;
}

export const STATUSES = statuses;
export const CODES = codes;
