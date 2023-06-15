export const getTime = (date) => {
  return new Date(date).toLocaleTimeString('ru').replace(/(.*)\D\d+/, '$1');
};
