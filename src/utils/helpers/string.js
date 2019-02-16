export const slug = (str = '') => {
  if (str === '') {
    return str;
  }

  let newStr = str
    .replace(/^\s+|\s+$/g, '') // trim
    .toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';

  for (let i = 0, l = from.length; i < l; i++) {
    newStr = newStr.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  newStr = newStr
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return newStr;
};

export const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`;

export const camelize = str => String(str)
  .split(' ')
  .map(s => `${s.charAt(0).toUpperCase()}${s.substring(1)}`)
  .join(' ');
