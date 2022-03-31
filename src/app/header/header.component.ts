import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import * as authActions from '../auth/store/auth.actions';
import * as recipesActions from '../recipes/store/recipe.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authSub: Subscription;
  recipesSub: Subscription;
  saveLoadSub: Subscription;
  messageTimeout;

  autosave: boolean;
  username: string = null;
  photoURL: string = null;
  message: string = null;

  get isAuthenticated() {
    return !!this.username;
  }

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.authSub = this.store.select('auth').subscribe((authState) => {
      const user = authState.user;
      if (user) {
        this.username = user.email;
        if (user.photoURL) {
          this.photoURL = user.photoURL;
        }
      } else {
        this.username = null;
        this.photoURL = null;
      }

      this.autosave = authState.autosave;
    });

    this.saveLoadSub = this.actions$
      .pipe(
        ofType(recipesActions.RECIPES_SAVED, recipesActions.SET_RECIPES),
        tap((action: Action) => {
          console.log(action);

          if (action.type === recipesActions.RECIPES_SAVED) {
            this.showMessage('Saved!');
          } else {
            this.showMessage('Loaded');
          }
        })
      )
      .subscribe();

    this.recipesSub = this.store.select('recipes').subscribe((recipesState) => {
      this.autosave = recipesState.autosave;
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
    if (this.saveLoadSub) this.saveLoadSub.unsubscribe();
    if (this.recipesSub) this.recipesSub.unsubscribe();
  }

  toggleAutosave() {
    this.store.dispatch(new recipesActions.ToggleAutosave());
  }

  onSaveData() {
    this.store.dispatch(new recipesActions.SaveRecipes());
  }

  onFetchData() {
    this.store.dispatch(new recipesActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new authActions.Logout());
  }

  showMessage(message: string, timeout: number = 2000) {
    console.log(message);
    this.message = message;

    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }

    this.messageTimeout = setTimeout(() => {
      this.message = null;
    }, timeout);
  }
}
