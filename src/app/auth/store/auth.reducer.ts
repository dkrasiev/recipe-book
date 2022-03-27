import { User } from '../user.model';
import * as authActions from './auth.actions';

export interface State {
  user: User;
  error: string;
  isLoading: boolean;
}

const initializeState: State = {
  user: null,
  error: null,
  isLoading: false,
};

export function AuthReducer(
  state = initializeState,
  action: authActions.AuthActions
) {
  switch (action.type) {
    case authActions.GOOGLE_LOGIN_START:
      return { ...state, isLoading: true };
    case authActions.LOGIN_START:
      return { ...state, isLoading: true };
    case authActions.AUTH_SUCCESS:
      return { ...state, user: action.payload, isLoading: false, error: null };
    case authActions.AUTH_FAIL:
      return { ...state, error: action.payload, isLoading: false };
    case authActions.LOGOUT:
      return { ...state, user: null };
    case authActions.SIGNUP_START:
      return { ...state, isLoading: true };
    case authActions.HANDLE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}
