import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../recipes/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import * as fromApp from '../store/app.reducer';
import * as authActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  recipesSubscription: Subscription;
  dataStorageSubscription: Subscription;
  messageTimeout;

  autosave: boolean = false;
  username: string = null;
  photoURL: string = null;
  message: string = null;

  get isAuthenticated() {
    return !!this.username;
  }

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.recipeService.recipesChanged.subscribe(() => {
      if (this.autosave) this.onSaveData();
    });

    this.store.select('auth').subscribe((authState) => {
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
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.recipesSubscription.unsubscribe();
    this.dataStorageSubscription.unsubscribe();
  }

  toggleAutosave() {
    this.autosave = !this.autosave;
  }

  onSaveData() {
    this.dataStorageService
      .saveRecipes()
      .then((result) => {
        this.showMessage('Saved!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe({
      next: () => this.showMessage('Loaded!'),
      error: (e) => this.showMessage(e.statusText),
    });
  }

  onLogout() {
    this.store.dispatch(new authActions.Logout());
  }

  showMessage(message: string, timeout: number = 2000) {
    this.message = message;

    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }

    this.messageTimeout = setTimeout(() => {
      this.message = null;
    }, timeout);
  }
}
