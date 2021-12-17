// Option Generator Function
const generateOptions = (options) =>
  Object.entries(options)
    .map(([cCode, cName]) => `<option value="${cCode}">${cName}</option>`)
    .join('');

export default generateOptions;
