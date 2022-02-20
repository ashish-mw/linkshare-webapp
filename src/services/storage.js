const _accessTokenKey = "ls__access_token";
const _themeKey = "ls__theme";

const _storageGet = (key) => {
  return localStorage.getItem(key);
};

const _storagePut = ({ key, value }) => {
  localStorage.setItem(key, value);
  return;
};

const _storageDel = (key) => {
  localStorage.removeItem(key);
  return;
};

export const getAccessTokenStorage = () => _storageGet(_accessTokenKey);
export const deleteAccessTokenStorage = () => _storageDel(_accessTokenKey);
export const putAccessTokenStorage = (token) =>
  _storagePut({ key: _accessTokenKey, value: token });

export const getThemeStorage = () => _storageGet(_themeKey);
export const deleteThemeStorage = () => _storageDel(_themeKey);
export const putThemeStorage = (token) =>
  _storagePut({ key: _themeKey, value: token });
