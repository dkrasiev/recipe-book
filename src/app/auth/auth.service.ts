import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { throwError } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as authActions from './store/auth.actions';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  logoutTimer;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AngularFireAuth,
    private store: Store<fromApp.AppState>
  ) {}

  googleAuth() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        const email = result.user.email;
        const id = result.user.uid;
        const photoURL = result.user.photoURL;
        result.user.getIdToken().then((token) => {
          this.handleAuthentication(email, id, token, 3600, photoURL);
        });
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  emailSignup(email: string, password: string) {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  emailLogin(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const email = result.user.email;
        const uid = result.user.uid;
        const photoURL = result.user.photoURL;

        result.user.getIdToken().then((token) => {
          this.handleAuthentication(email, uid, token, 3600, photoURL);
        });
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  logout() {
    this.store.dispatch(new authActions.Logout());
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      photoURL: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.photoURL
    );

    if (loadedUser.token) {
      this.store.dispatch(new authActions.Login(loadedUser));
      this.autoLogout(
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      );
    }
  }

  autoLogout(expirationDuration: number) {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }

    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
    photoURL: string = null
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(email, userId, token, expirationDate, photoURL);

    this.store.dispatch(new authActions.Login(user));
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    this.router.navigate(['/recipes']);
  }

  private handleError(e: any) {
    this.store.dispatch(new authActions.CatchError(e.message));
    throwError(() => e);
  }
}
