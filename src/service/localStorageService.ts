export const localStorageValues = {
  URL: { name: 'URL' },
  headers: { name: 'headers' },
  variables: { name: 'variables' },
  query: { name: 'query' },
};

export const getValueByKeyFromLocalStorage = (key: string, defaultValue: string = '') => {
  return localStorage.getItem(key) || defaultValue;
};
