import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN_START = '[Auth] Login Start';
export const GOOGLE_LOGIN_START = '[Auth] Google Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const LOGOUT = '[Auth] Logout';
export const CATCH_ERROR = '[Auth] Catch Error';
export const HANDLE_ERROR = '[Auth] Handle Error';

export class GoogleLoginStart implements Action {
  readonly type = GOOGLE_LOGIN_START;
  constructor() {}
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;

  constructor() {}
}

export class CatchError implements Action {
  readonly type = CATCH_ERROR;

  constructor(public payload: string) {}
}

export class HandleError implements Action {
  readonly type = HANDLE_ERROR;

  constructor() {}
}

export type AuthActions =
  | GoogleLoginStart
  | LoginStart
  | LoginSuccess
  | LoginFail
  | Logout
  | CatchError
  | HandleError;
