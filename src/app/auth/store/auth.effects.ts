import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GoogleAuthProvider } from 'firebase/auth';
import { map, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
  handleAuth = (result: firebase.default.auth.UserCredential) => {
    const email = result.user.email;
    const uid = result.user.uid;
    const photoURL = result.user.photoURL;
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

    return result.user.getIdToken().then((token) => {
      const user = new User(email, uid, token, expirationDate, photoURL);

      localStorage.setItem('userData', JSON.stringify(user));

      this.authService.setLogoutTimer(
        expirationDate.getTime() - new Date().getTime()
      );

      return new authActions.AuthSuccess(user);
    });
  };

  handleError = (error) => {
    return new authActions.AuthFail(error.message);
  };

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
          .catch((error) => this.handleError(error));
      })
    );
  });

  googleAuthLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.GOOGLE_LOGIN_START),
      switchMap((action: authActions.GoogleLoginStart) => {
        return this.auth
          .signInWithPopup(new GoogleAuthProvider())
          .then((result) => this.handleAuth(result))
          .catch((error) => this.handleError(error));
      })
    );
  });

  authSignup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.SIGNUP_START),
      switchMap((action: authActions.SignupStart) => {
        return this.auth
          .createUserWithEmailAndPassword(
            action.payload.email,
            action.payload.password
          )
          .then((result) => this.handleAuth(result))
          .catch((error) => this.handleError(error));
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.AUTH_SUCCESS),
        tap(() => {
          this.router.navigate(['/recipes']);
        })
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.LOGOUT),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/login']);
        })
      );
    },
    { dispatch: false }
  );

  autologin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: Date;
          photoURL?: string;
        } = JSON.parse(localStorage.getItem('userData'));

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          userData._tokenExpirationDate,
          userData.photoURL
        );

        if (loadedUser.token) {
          return new authActions.AuthSuccess(loadedUser);
        } else {
          return { type: 'DUMMY' };
        }
      })
    );
  });

  constructor(
    public actions$: Actions,
    private auth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) {}
}
