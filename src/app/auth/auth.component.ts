import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import { AuthService } from './auth.service';
import * as authActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false })
  alertPlaceholder: PlaceholderDirective;
  closeSub: Subscription;
  storeSub: Subscription;

  isLoginMode = true;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
    this.store.select('auth').subscribe((authData) => {
      if (authData.error) {
        this.showError(authData.error);
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) this.closeSub.unsubscribe();
    if (this.storeSub) this.storeSub.unsubscribe();
  }

  onGoogleAuth() {
    this.authService.googleAuth();
  }

  onHandleError() {
    this.store.dispatch(new authActions.HandleError());
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      throw new Error('Form is invalid');
    }

    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.authService.emailLogin(email, password);
    } else {
      this.authService.emailSignup(email, password);
    }
  }

  showError(message: string) {
    this.alertPlaceholder.viewContainerRef.clear();
    const alertRef =
      this.alertPlaceholder.viewContainerRef.createComponent(AlertComponent);

    alertRef.instance.message = message;
    this.closeSub = alertRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      this.alertPlaceholder.viewContainerRef.clear();
      this.onHandleError();
    });
  }
}
