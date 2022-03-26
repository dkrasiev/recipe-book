import { User } from '../user.model';
import * as authActions from './auth.actions';

export interface State {
  user: User;
}

const initializeState: State = {
  user: null,
};

export function AuthReducer(
  state = initializeState,
  action: authActions.AuthActions
) {
  switch (action.type) {
    case authActions.LOGIN:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
