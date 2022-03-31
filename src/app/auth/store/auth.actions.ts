import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN_START = '[Auth] Login Start';
export const GOOGLE_LOGIN_START = '[Auth] Google Login Start';
export const AUTH_SUCCESS = '[Auth] Auth Success';
export const AUTH_FAIL = '[Auth] Auth Fail';
export const LOGOUT = '[Auth] Logout';
export const SIGNUP_START = '[Auth] Signup Start';
export const HANDLE_ERROR = '[Auth] Handle Error';
export const AUTO_LOGIN = '[Auth] Autologin';

export class GoogleLoginStart implements Action {
  readonly type = GOOGLE_LOGIN_START;
  constructor() {}
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;
  constructor(public payload: { user: User; redirect?: boolean }) {}
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor() {}
}

export class HandleError implements Action {
  readonly type = HANDLE_ERROR;
  constructor() {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
  constructor() {}
}

export type AuthActions =
  | GoogleLoginStart
  | LoginStart
  | SignupStart
  | AuthSuccess
  | AuthFail
  | Logout
  | HandleError;
