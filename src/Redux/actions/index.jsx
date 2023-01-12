export const LOGIN = 'login';

export const saveUser = (user) => ({
  type: LOGIN,
  ...user,
});
