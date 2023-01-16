export const LOGIN = 'login';

export const saveUser = (user) => ({
  type: LOGIN,
  ...user,
});

export const SCORE = 'score';

export const saveScore = (score, assertions) => ({
  type: SCORE,
  score,
  assertions,
});
