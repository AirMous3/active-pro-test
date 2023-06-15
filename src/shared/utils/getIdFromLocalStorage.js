export const getIdFromLocalStorage = (id) => {
  return JSON.parse(localStorage.getItem(id));
};
