import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN = 'LOGIN';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: User) {}
}

export type AuthActions = Login;