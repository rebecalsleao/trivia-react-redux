import { SCORE } from '../actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};
const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SCORE:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };

  default:
    return state;
  }
};
export default player;
