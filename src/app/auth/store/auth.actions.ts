import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CATCH_ERROR = 'CATCH_ERROR';
export const HANDLE_ERROR = 'HANDLE_ERROR';

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
