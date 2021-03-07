export const getAccessToken = () => {
  const token = JSON.parse(window.localStorage.getItem('token'));
  return token ? token.access : '';
};

export const getUser = () => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  return user || null;
};

