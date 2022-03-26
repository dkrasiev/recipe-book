import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const CATCH_ERROR = '[Auth] Catch Error';
export const HANDLE_ERROR = '[Auth] Handle Error';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: User) {}
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

export type AuthActions = Login | Logout | CatchError | HandleError;
