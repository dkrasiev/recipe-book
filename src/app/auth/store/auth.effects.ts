import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GoogleAuthProvider } from 'firebase/auth';
import { map, switchMap, tap } from 'rxjs';
import { User } from '../user.model';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.LOGIN_START),
      switchMap((authData: authActions.LoginStart) => {
        return this.auth
          .signInWithEmailAndPassword(
            authData.payload.email,
            authData.payload.password
          )
          .then((result) => this.handleAuth(result))
          .catch((error) => {
            return new authActions.LoginFail(error.message);
          });
      })
    );
  });

  googleAuthLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.GOOGLE_LOGIN_START),
      switchMap((authData: authActions.GoogleLoginStart) => {
        return this.auth
          .signInWithPopup(new GoogleAuthProvider())
          .then((result) => this.handleAuth(result))
          .catch((error) => {
            return new authActions.LoginFail(error.message);
          });
      })
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.LOGIN_SUCCESS),
        tap(() => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  handleAuth(result: firebase.default.auth.UserCredential) {
    const email = result.user.email;
    const uid = result.user.uid;
    const photoURL = result.user.photoURL;
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    return result.user.getIdToken().then((token) => {
      return new authActions.LoginSuccess(
        new User(email, uid, token, expirationDate, photoURL)
      );
    });
  }

  constructor(
    public actions$: Actions,
    private auth: AngularFireAuth,
    private router: Router
  ) {}
}
