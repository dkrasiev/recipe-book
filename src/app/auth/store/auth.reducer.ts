import { User } from '../user.model';
import * as authActions from './auth.actions';

export interface State {
  user: User;
  error: string;
}

const initializeState: State = {
  user: null,
  error: null,
};

export function AuthReducer(
  state = initializeState,
  action: authActions.AuthActions
) {
  switch (action.type) {
    case authActions.LOGIN:
      return { ...state, user: action.payload };
    case authActions.LOGOUT:
      return { ...state, user: null };
    case authActions.CATCH_ERROR:
      console.log(action.payload);

      return { ...state, error: action.payload };
    case authActions.HANDLE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}
